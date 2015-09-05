import React, { Component } from 'react';

import ObjectDescription from './ObjectDescription';
import ObjectPreview from './ObjectPreview';

export default class ObjectInspector extends Component {

  propTypes: {
    name: PropTypes.string,
    data: PropTypes.object,
    depth: PropTypes.number,
    objectinspectorid: PropTypes.string
  }

  static defaultProps = {
      name: void 0,
      data: undefined,
      depth: 0,
      objectinspectorid: String(void 0),
      className: 'ObjectInspector'
  }

  constructor(props) {
    super(props);

    if(props.depth === 0){
      this.state = {expandedTree: {}};
      this.state.expandedTree[props.objectinspectorid] = false;
    }
  }

  static isExpandable(data){
    return (typeof data === 'object' && data !== null && Object.keys(data).length > 0);
  }

  getExpanded(objectinspectorid){
    const expandedTree = this.state.expandedTree;
    if (typeof expandedTree[objectinspectorid] !== 'undefined') {
      return expandedTree[objectinspectorid];
    }
    return false;
  }

  setExpanded(objectinspectorid, expanded){
    const expandedTree = this.state.expandedTree;
    expandedTree[objectinspectorid] = expanded;
    this.setState({expandedTree: expandedTree});
  }

  handleClick() {
    // console.log(this.props.data);
    if (ObjectInspector.isExpandable(this.props.data)) {
      if (this.props.depth > 0) {
        this.props.setExpanded(this.props.objectinspectorid, !this.props.getExpanded(this.props.objectinspectorid));
      }
      else{
        this.setExpanded(this.props.objectinspectorid, !this.getExpanded(this.props.objectinspectorid));
      }
    }
  }

  componentWillMount(){
    React.initializeTouchEvents(true);
  }

  render() {
    const data = this.props.data;
    const name = this.props.name;
    const className = this.props.className;

    const setExpanded = (this.props.depth === 0) ? (this.setExpanded.bind(this)) : this.props.setExpanded;
    const getExpanded = (this.props.depth === 0) ? (this.getExpanded.bind(this)) : this.props.getExpanded;
    const expanded = getExpanded(this.props.objectinspectorid);

    const expandGlyph = ObjectInspector.isExpandable(data) ? (expanded ? '▼' : '▶') : (typeof name === 'undefined' ? '' : ' ');

    let propertyNodesContainer;
    if(expanded){
      let propertyNodes = [];

      for(let propertyName in data){
        const propertyValue = data[propertyName];
        if(data.hasOwnProperty(propertyName)){
          propertyNodes.push(<ObjectInspector getExpanded={getExpanded}
                                              setExpanded={setExpanded}
                                              className={className}
                                              objectinspectorid={`${this.props.objectinspectorid}.${propertyName}`}
                                              depth={this.props.depth + 1}
                                              key={propertyName}
                                              name={propertyName}
                                              data={propertyValue}></ObjectInspector>);
        }
      }
      propertyNodesContainer = (<div style={{paddingLeft:"12px"}} className={`${className}-property-nodes-container`}>{propertyNodes}</div>);
    }

    return (
      <div className={`${className}`}>
        <span className={`${className}-property`} onTouchStart={this.handleClick.bind(this)} onClick={this.handleClick.bind(this)}>
          <span className={`${className}-expand-control ${className}-unselectable`}>{expandGlyph}</span>
          {(() => {
            if (typeof name !== 'undefined') {
              return (<span>
                        <span className={`${className}-object-name`}>{name}</span>
                        <span>: </span>
                        <ObjectDescription className={className} object={data} />
                      </span>);
            }
            else{
              return (<ObjectPreview className={className} object={data}/>);
            }
          })()}
        </span>
        {propertyNodesContainer}
      </div>
    );
  }
}
