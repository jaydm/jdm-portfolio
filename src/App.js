import React, { Component } from 'react';
import './App.scss';

import Header from './components/Header';
import Menu from './components/Menu';
import Attribution from './components/Attribution';

class App extends Component {
  render() {
    return (
      <div className='App-leftMenu'>
        <Header />
        <Menu />
        <Attribution />
      </div>
    );
  }
}

export default App;
