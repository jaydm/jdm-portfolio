import React from 'react';

import './DC.scss';

function AttributeText(props) {
  return (
    <React.Fragment>
      <div></div>
      <div className='dcc--label'>{props.data.label}:</div>
      <div className='dcc--data'>
        <input
          type='text'
          id={props.cname + '.' + props.ndx + '.input'}
          data_attribute_index={props.ndx}
          data_attribute_type='text'
          value={props.data.value}
          length={props.data.len}
          onChange={props.onChange} />
      </div>
    </React.Fragment>
  )
}

function SelectOption(selectOption, index) {
  return <option value={selectOption} key={index}>{selectOption}</option>
}

function AttributeSelect(props) {
  return (
    <React.Fragment>
      <div></div>
      <div className='dcc--label'>{props.data.label}:</div>
      <div className='dcc--data'>
        {(props.data.options.length === 0 ? null :
          <select
            id={props.cname + '.' + props.data.sequence + '.select'}
            value={props.data.value}
            data_attribute_index={props.data.sequence}
            data_attribute_type='text'
            onChange={props.onChange}>
            {props.data.options.map((selectOption, index) => SelectOption(selectOption, index))}
          </select>
        )}
      </div>
    </React.Fragment>
  )
}

// this function receives an attribute
function AttributeMixed(props) {
  return (
    <React.Fragment>
      <div></div>
      <div className='dcc--label'>{props.data.label}:</div>
      <div className='dcc--data'>
        <input
          type='text'
          id={props.cname + '.' + props.data.sequence + '.input'}
          data_attribute_index={props.data.sequence}
          data_attribute_type='text'
          value={props.data.value}
          length={props.data.len}
          onChange={props.onChange} />
        {(props.data.options.length === 0 ? null :
          <select
            id={props.cname + '.' + props.data.sequence + '.select'}
            value={props.data.value}
            data_attribute_index={props.data.sequence}
            data_attribute_type='select'
            onChange={props.onChange}>
            {props.data.options.map((selectOption, index) => SelectOption(selectOption, index))}
          </select>
        )}
      </div>
    </React.Fragment>
  )
}

function AttributeEmpty() {
  return (
    <React.Fragment>
      <div></div>
      <div className='dcc--label'></div>
      <div className='dcc--data'></div>
    </React.Fragment>
  )
}

function Attributes(componentName, attribute, onChange) {
  switch (attribute.type) {
    case 'AttributeText':
      return <AttributeText cname={componentName} data={attribute} onChange={onChange} />
    case 'AttributeSelect':
      return <AttributeSelect cname={componentName} data={attribute} onChange={onChange} />
    case 'AttributeMixed':
      return <AttributeMixed cname={componentName} data={attribute} onChange={onChange} />
    default:
      return <AttributeEmpty />
  }

}

function ComponentAttributes(props) {
  if (props.isCollapsed) return null

  const data = props.data
  const componentName = `${data.class.name}.${data.componentID}`

  return data.attributes.map(attribute => Attributes(componentName, attribute, props.onChange))
}

class DynamicComponent extends React.Component {
  constructor(props) {
    super(props)

    const data = props.dataFormat

    this.state = {
      componentID: data.componentID,
      class: data.class,
      label: data.label,
      attributes: data.attributes,
      isCollapsed: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.toggleCollapsed = this.toggleCollapsed.bind(this)
  }

  handleChange(event) {
    const data_attribute_index = event.target.attributes.getNamedItem('data_attribute_index').value - 1
    // const data_attribute_type = event.target.attributes.getNamedItem('data_attribute_type').value
    const newValue = event.target.value

    let newState = this.state;

    newState.attributes[data_attribute_index].value = newValue

    this.setState(newState)
  }

  toggleCollapsed() {
    console.log('toggling...')
    console.log(this.state)

    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  render() {
    if (this.state.attributes.length === 0) return null

    return (
      <div className='dcc--container' >
        <div className='dcc--twistie'>
          <button onClick={this.toggleCollapsed}>{this.state.isCollapsed ? '<+>' : '<->'}</button>
        </div>
        <div className='dcc--name'>{this.state.label}</div>
        <ComponentAttributes data={this.state} onChange={this.handleChange} />
      </div>
    )
  }
}

export default DynamicComponent