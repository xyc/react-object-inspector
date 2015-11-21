import React, { Component } from 'react';

import CodeEditor from './CodeEditor';
import ObjectInspector from 'react-object-inspector';

import JSONLint from 'json-lint';

const defaultData = {
    "login": "defunkt",
    "id": 2,
    "avatar_url": "https://avatars.githubusercontent.com/u/2?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/defunkt",
    "html_url": "https://github.com/defunkt",
    "followers_url": "https://api.github.com/users/defunkt/followers",
    "following_url": "https://api.github.com/users/defunkt/following{/other_user}",
    "gists_url": "https://api.github.com/users/defunkt/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/defunkt/subscriptions",
    "organizations_url": "https://api.github.com/users/defunkt/orgs",
    "repos_url": "https://api.github.com/users/defunkt/repos",
    "events_url": "https://api.github.com/users/defunkt/events{/privacy}",
    "received_events_url": "https://api.github.com/users/defunkt/received_events",
    "type": "User",
    "site_admin": true,
    "name": "Chris Wanstrath",
    "company": "GitHub",
    "blog": "http://chriswanstrath.com/",
    "location": "San Francisco",
    "email": "chris@github.com",
    "hireable": true,
    "bio": null,
    "public_repos": 108,
    "public_gists": 280,
    "followers": 14509,
    "following": 208,
    "created_at": "2007-10-20T05:24:19Z",
    "updated_at": "2015-08-03T18:05:52Z"
};

export default class CodePlayground extends Component {
  constructor(props){
    super(props);

    this.state = {codeText: JSON.stringify(defaultData, null, 2)};
  }

  handleCodeEditorChange(value){
    // console.log(value);
    this.setState({codeText: value});
  }

  render(){
    let dataObject;
    let error;

    try{
      dataObject = eval(`(${this.state.codeText.toString()})`);
      // debugger;
    }
    catch(e){
      // console.warn(e);
      error = e;
    }

    // console.log(dataObject)
    const lint = JSONLint(this.state.codeText);

    return (
      <div>
        <div className="container" style={{
            marginTop: 25,

            // marginLeft: 100,
            // marginRight: 100,
            maxWidth: 'none'
          }}>
          <div className="row" >
            <div className="six columns">
              <CodeEditor onChange={this.handleCodeEditorChange.bind(this)}
                          codeText={this.state.codeText}
                          style={{
                            // height: 600
                            marginBottom: 25
                          }}/>
            </div>
            <div className="six columns">
              {/*
                <span>
                  {this.state.codeText.toString()}
                </span>
              */}
              {(()=>{
                if(error){
                  // debugger;
                  return (
                    <p>
                      {`${lint.error} at line ${lint.line}, character ${lint.character}`}
                    </p>
                  )
                }
                else{
                  return (
                    <ObjectInspector data={dataObject}>
                    </ObjectInspector>
                  )
                }
              })()}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

// var a={
//   "a1": 1,
//   "a2": "A2",
//   "a3": true,
//   "a4": undefined,
//   "a5": {
//     "a5-1": null,
//     "a5-2": ["a5-2-1", "a5-2-2"],
//     "a5-3": {}
//   },
//   "a6": function(){
//     console.log("hello world")
//   },
//   "a7": new Date("2005-04-03")
// }
