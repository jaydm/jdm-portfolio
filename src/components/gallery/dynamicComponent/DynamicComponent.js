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
  if (props.isCollapsed) return null

  return props.componentAttributes.map((attribute) => {
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

    this.state = {
      componentClass: props.dataFormat.componentClass,
      componentLabel: props.dataFormat.componentLabel,
      componentAttributes: props.dataFormat.componentAttributes,
      isCollapsed: false
    }

    this.handleChange = this.props.handleChange.bind(this)
    this.toggleCollapsed = this.toggleCollapsed.bind(this)
  }

  toggleCollapsed() {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  render = () => {
    if (this.state.componentAttributes.length !== 0) return null

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