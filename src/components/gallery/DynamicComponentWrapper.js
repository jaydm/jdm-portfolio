import React from 'react';

import './gallery.scss';

import dataFormat from './dynamicComponent/dataFormat'
import DynamicComponent from './dynamicComponent/DynamicComponent';

class DynamicComponentWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target

    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }

  render() {
    return (
      <div className='gallery--container'>
        <div className='gallery--backup'>
          <h1>The data supporting the component will display here</h1>
        </div>
        <div className='gallery--show'>
          <DynamicComponent dataFormat={dataFormat} handleChange={this.handleChange} />
        </div>
      </div>
    )
  }
}

export default DynamicComponentWrapper;