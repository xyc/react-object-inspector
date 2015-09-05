import React, { Component } from 'react';

import ObjectDescription from './ObjectDescription';

function intersperse(arr, sep){
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce(function(xs, x, i) {
      return xs.concat([sep, x]);
  }, [arr[0]]);
}

/**
 * A preview of the object on root level node
 */
export default class ObjectPreview extends Component {
  propTypes: {
    maxProperties: PropTypes.number; // maximum properties displayed in preview
  }

  static defaultProps = {
    maxProperties: 5
  }

  render() {
    const object = this.props.object;
    const className = this.props.className;

    if (typeof object !== 'object' || object === null) {
      return (<ObjectDescription className={className} object={object} />);
    }

    if (Array.isArray(object)) {
      return <span className={`${className}-object-preview`}>[
        {intersperse(object.map(function(element, index){
          return (<ObjectDescription className={className} key={index} object={element} />)
        }), ", ")}
      ]</span>;
    }
    else if (object instanceof Date) {
      return <span>{object.toString()}</span>;
    }
    else {
      let propertyNodes = [];
      for(let propertyName in object){
        const propertyValue = object[propertyName];
        if(object.hasOwnProperty(propertyName)){
          let ellipsis;
          if (propertyNodes.length === (this.props.maxProperties - 1)
              && Object.keys(object).length > this.props.maxProperties) {
            ellipsis = (<span key={'ellipsis'}>…</span>);
          }
          propertyNodes.push(
            <span key={propertyName}>
              <span className={`${className}-object-name`}>{propertyName}</span>
              :&nbsp;
              <ObjectDescription className={className} object={propertyValue} />
              {ellipsis}
            </span>
          );
          if(ellipsis)
            break;
        }
      }

      return (<span className={`${className}-object-preview`}>
                  {'Object {'}
                  {intersperse(propertyNodes, ", ")}
                  {'}'}
              </span>);
    }
  }
}
