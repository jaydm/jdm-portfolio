import React from 'react';

import './gallery.scss';

import dataFormat1 from './dynamicComponent/dataFormat1'
import dataFormat2 from './dynamicComponent/dataFormat2'

import DynamicComponent from './dynamicComponent/DynamicComponent';

class DynamicComponentWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataFormat1: dataFormat1,
      dataFormat2: dataFormat2
    }
  }

  render() {
    return (
      <div className='gallery--container'>
        <div className='gallery--backup'>
          <textarea value={JSON.stringify(this.state.dataFormat1, undefined, 2)}></textarea>
        </div>
        <div className='gallery--show'>
          <DynamicComponent dataFormat={this.state.dataFormat1} />
        </div>
      </div>
    )
  }
}

export default DynamicComponentWrapper;