import React, { Component } from 'react';

import './App.scss';

import Header from './components/site/Header';
import Menu from './components/site/Menu';
import Attribution from './components/site/Attribution';

import DynamicComponent from './components/gallery/dynamicComponent/DynamicComponent'
import dataFormat from './components/gallery/dynamicComponent/dataFormat'
import JSONPlayground from './components/gallery/dynamicComponent/JSONPlayground';

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
            <JSONPlayground name='example' json={JSON.stringify(dataFormat)} />
            <DynamicComponent dataFormat={dataFormat} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
