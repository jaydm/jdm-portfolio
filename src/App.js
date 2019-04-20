import React, { Component } from 'react';
import './App.css';

import Logo from './components/Logo';
import Menu from './components/Menu';
import Attribution from './components/Attribution';

class App extends Component {
  render() {
    return (
      <div className='App-leftMenu'>
        <Logo />
        <Menu />
        <Attribution />
      </div>
    );
  }
}

export default App;
