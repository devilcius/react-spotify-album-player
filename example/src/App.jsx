import React from 'react';
import Fork from 'react-ghfork';
import pkgInfo from '../package.json';
import Demo from './Demo.jsx';
require('purecss');
require('react-ghfork/gh-fork-ribbon.css');
require('highlight.js/styles/github.css');

export default class App extends React.Component {
  render() {
    return (
      <div className="pure-g">
          <header className="pure-u-1">
              <h1>{pkgInfo.name}</h1>
              <div className="description">{pkgInfo.description}</div>
          </header>
        <Fork className="right" project={pkgInfo.user + '/' + pkgInfo.name} />
            <article className="pure-u-1">
              <h2>Demonstration</h2>                  
                  <Demo />
          </article>
      </div>
    );
  }
}
