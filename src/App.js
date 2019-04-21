import React, { Component } from 'react';
import './App.scss';

import Header from './components/Header';
import Menu from './components/Menu';
import Attribution from './components/Attribution';

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
            <h1>This is the main area</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
