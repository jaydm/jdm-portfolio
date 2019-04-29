import React from 'react';

import './DC.scss';

function AttributeText(props) {
  return (
    <React.Fragment>
      <div className='dcc--label'>{props.data.fieldLabel}:</div>
      <div className='dcc--data'></div>
      <div className='dcc--data'>
        <input
          type='text'
          id={props.data.fieldID}
          name={props.data.fieldName + '-' + props.data.fieldID}
          value={props.data.fieldValue}
          length={props.data.fieldLength}
          onChange={props.changeHandler} />
      </div>
    </React.Fragment>
  )
}

function AttributeSelect(props) {
  return (
    <React.Fragment>
      <div className='dcc--label'>{props.data.fieldLabel}:</div>
      <div className='dcc--data'>
        <select onChange={props.changeHandler} value={props.data.fieldValue}>
          {props.data.fieldOptions.length > 0 && props.data.fieldOptions.map(option => <option value={option}>{option}</option>)}
        </select>
      </div>
    </React.Fragment>
  )
}

function AttributeMixed(props) {
  return (
    <React.Fragment>
      <div className='dcc--label'>{props.data.fieldLabel}:</div>
      <div className='dcc--data'>
        <input
          type='text'
          id={props.data.fieldID}
          name={props.data.fieldName + '-' + props.data.fieldID}
          value={props.data.fieldValue}
          length={props.data.fieldLength}
          onChange={props.data.changeHandler} />
        <select onChange={props.changeHandler} value={props.data.fieldValue}>
          {props.data.fieldOptions.length > 0 && props.data.fieldOptions.map(option => <option value={option}>{option}</option>)}
        </select>
      </div>
    </React.Fragment>
  )
}

function AttributeEmpty() {
  return (
    <React.Fragment>
      <div className='dcc--label'></div>
      <div className='dcc--data'></div>
    </React.Fragment>
  )
}

function ComponentAttributes(props) {
  console.log('Entering componentAttributes function...')
  console.log(props)

  if (props.data.isCollapsed) return null

  return props.data.componentAttributes.map((attribute) => {
    switch (attribute.fieldType) {
      case 'AttributeText':
        return <AttributeText data={attribute} />
      case 'AttributeSelect':
        return <AttributeSelect data={attribute} />
      case 'AttributeMixed':
        return <AttributeMixed data={attribute} />
      default:
        return <AttributeEmpty />
    }
  })
}

class DynamicComponent extends React.Component {
  constructor(props) {
    super(props)

    console.log('Constructor props...')
    console.log(props)

    console.log('Number of attributes: ' + props.dataFormat.componentAttributes.length)

    this.state = {
      componentClass: props.dataFormat.componentClass,
      componentLabel: props.dataFormat.componentLabel,
      componentAttributes: props.dataFormat.componentAttributes,
      isCollapsed: false
    }

    console.log('Number of attributes saved: ' + this.state.componentAttributes.length);
    this.handleChange = this.props.handleChange.bind(this)
    this.toggleCollapsed = this.toggleCollapsed.bind(this)
  }

  toggleCollapsed() {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  render() {
    console.log('Entering render method...')

    if (this.state.componentAttributes.length === 0) return null

    console.log('There are attributes to print...')

    return (
      <div className='dcc--container' >
        <div className='dcc--twistie'>
          <button onClick={this.toggleCollapsed}>{this.state.isCollapsed ? '<+>' : '<->'}</button>
        </div>
        <div className='dcc--name'>{this.state.componentLabel}</div>
        <div></div>
        <ComponentAttributes data={this.state} />
      </div >
    )
  }
}

export default DynamicComponent