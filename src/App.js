import React, { Component } from 'react';

import './App.scss';

import Header from './components/site/Header';
import Menu from './components/site/Menu';
import Attribution from './components/site/Attribution';

import DynamicComponentWrapper from './components/gallery/DynamicComponentWrapper';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div id='body'>
          <div className='leftColumn'>
            <Menu />
            <Attribution />
          </div>
          <div id='substance'>
            <DynamicComponentWrapper />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
