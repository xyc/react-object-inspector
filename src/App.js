import React, { Component } from 'react';

import CodePlayground from './CodePlayground';

// import '../css/react-object-inspector.css';
import GithubCorner from './GithubCorner';

export class App extends Component {
  render() {
    return (
      <div>
        <GithubCorner url="https://github.com/xyc/react-object-inspector" />

        {/*
          <Counter increment={1} color={NICE} />
          <Counter increment={5} color={SUPER_NICE} />*/}
        <div className="container">
          <section className="header">
            <h2 className="title" style={{
                                          textAlign: 'center',
                                          marginTop: '10rem',
                                          letterSpacing: '0.2em',
                                          // textTransform: 'uppercase'
                                          // transform: 'scale(1.5,1)'
                                        }}>
              react-object-inspector
            </h2>
          </section>
        </div>

        <CodePlayground />

      </div>
    );
  }
}
