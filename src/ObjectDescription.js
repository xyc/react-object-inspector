import React, { Component } from 'react';

/**
 * A short description of the object
 */
export default class ObjectDescription extends Component{
  render() {
    const object = this.props.object;
    const className = this.props.className;

    switch (typeof object){
      case 'number':
        return (<span className={`${className}-object-value-number`}>{object}</span>);
      case 'string':
        return (<span className={`${className}-object-value-string`}>&quot;{object}&quot;</span>);
      case 'boolean':
        return (<span className={`${className}-object-value-boolean`}>{String(object)}</span>); // why simple {object} won't work?
      case 'undefined':
        return (<span className={`${className}-object-value-undefined`}>undefined</span>);
      case 'object':
        if(object === null){
          return (<span className={`${className}-object-value-null`}>null</span>)
        }
        if(object instanceof Date){
          return (<span>{object.toString()}</span>);
        }
        if(Array.isArray(object)){
          return (<span>{`Array[${object.length}]`}</span>);
        }
        return (<span className={`${className}-object-value-object`}>Object</span>);
      case 'function':
        return (<span>
                  <span className={`${className}-object-value-function-keyword`}>function</span>
                  <span className={`${className}-object-value-function-name`}>&nbsp;{object.name}()</span>
                </span>);
      case 'symbol':
        return (<span className={`${className}-object-value-symbol`}>Symbol()</span>)
      default:
        return (<span></span>);
    }
  }
}
