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
        <div className='App-leftMenu'>
          <Menu />
          <Attribution width='200' />
        </div>
      </div>
    );
  }
}

export default App;
