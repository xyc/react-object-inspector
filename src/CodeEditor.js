import React, { Component } from 'react';
import CodeMirror from 'codemirror';

// CSS files <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.7.0/codemirror.css">
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.7.0/theme/monokai.css">
// npm i --save codemirror
require('codemirror/mode/javascript/javascript');

// const IS_MOBILE = typeof navigator !== 'undefined' && (
//   navigator.userAgent.match(/Android/i)
//   || navigator.userAgent.match(/webOS/i)
//   || navigator.userAgent.match(/iPhone/i)
//   || navigator.userAgent.match(/iPad/i)
//   || navigator.userAgent.match(/iPod/i)
//   || navigator.userAgent.match(/BlackBerry/i)
//   || navigator.userAgent.match(/Windows Phone/i)
//   );

export default class CodeEditor extends Component {
  propTypes: {
    readOnly: PropTypes.bool,
    codeText: PropTypes.string,
  }

  static defaultProps = {
    readOnly: false,
    codeText: ""
  }

  componentDidMount() {
    // IS_MOBILE

    this.editor = CodeMirror.fromTextArea(this.refs.editor, {
      mode: 'javascript',
      lineNumbers: true,
      // lineNumbers: false,
      lineWrapping: true,
      matchBrackets: true,
      tabSize: 2,
      theme: 'monokai', //'solarized light', // 'monokai'
      readOnly: this.props.readOnly
    });
    this.editor.setSize("100%", 450); // width, height
    this.editor.on('change', this.handleChange.bind(this));
  }

  componentDidUpdate(){
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  }

  handleChange(){
    if(!this.props.readOnly){
      this.props.onChange && this.props.onChange(this.editor.getValue());
    }
  }

  render(){
    // IS_MOBILE
    let editor;
    editor = <textarea ref="editor" defaultValue={this.props.codeText} />;

    return (
      <div {...this.props}>
        {editor}
      </div>
    );
  }
}
