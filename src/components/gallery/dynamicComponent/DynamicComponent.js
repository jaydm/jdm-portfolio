import React from 'react';

import './DC.scss';

function AttributeText(props) {
  const data = props.data
  const componentName = props.cname
  const attributeIndex = props.ndx

  const textName = componentName + '.' + attributeIndex + '.input'

  const onChange = props.onChange

  console.log(data)
  console.log(componentName)
  console.log(attributeIndex)
  console.log(textName)

  return (
    <React.Fragment>
      <div></div>
      <div className='dcc--label'>{data.label}:</div>
      <div className='dcc--data'>
        <input
          type='text'
          id={textName}
          data_attribute_index={attributeIndex}
          data_attribute_type='text'
          value={data.value}
          length={data.len}
          onChange={onChange} />
      </div>
    </React.Fragment>
  )
}

function SelectOption(selectOption, index) {
  return <option value={selectOption} key={index}></option>
}

function AttributeSelect(props) {
  const data = props.data
  const componentName = props.cname
  const attributeIndex = props.ndx

  const selectName = componentName + '.' + attributeIndex + '.select'

  const onChange = props.onChange

  console.log(data)
  console.log(componentName)
  console.log(attributeIndex)
  console.log(selectName)

  return (
    <React.Fragment>
      <div></div>
      <div className='dcc--label'>{data.label}:</div>
      <div className='dcc--data'>
        {(data.options.length === 0 ? null :
          <select value={data.value} data_attribute_index={attributeIndex} data_attribute_type='text' onChange={onChange}>
            {data.options.map((selectOption, index) => SelectOption(selectOption, index))}
          </select>
        )}
      </div>
    </React.Fragment>
  )
}

// this function receives an attribute
function AttributeMixed(props) {
  const data = props.data
  const componentName = props.cname
  const attributeIndex = data.sequence

  const textName = componentName + '.' + attributeIndex + '.input'
  const selectName = componentName + '.' + attributeIndex + '.select'

  const onChange = props.onChange

  console.log(data)
  console.log(componentName)
  console.log(attributeIndex)
  console.log(textName)
  console.log(selectName)

  return (
    <React.Fragment>
      <div></div>
      <div className='dcc--label'>{data.label}:</div>
      <div className='dcc--data'>
        <input
          type='text'
          id={textName}
          data_attribute_index={attributeIndex}
          data_attribute_type='text'
          value={data.value}
          length={data.len}
          onChange={onChange} />
        {(data.options.length === 0 ? null :
          <select value={data.value} data_attribute_index={attributeIndex} data_attribute_type='select' onChange={onChange}>
            {data.options.map((selectOption, index) => SelectOption(selectOption, index))}
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

function Attribute(componentName, attribute, onChange) {
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

  return data.attributes.map(attribute => Attribute(componentName, attribute, props.onChange))
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
    console.log(event)
    console.log(event.target)

    const data_attribute_index = event.target.attributes.getNamedItem('data_attribute_index').value - 1
    const data_attribute_type = event.target.attributes.getNamedItem('data_attribute_type').value
    const newValue = event.target.value

    console.log('Handling changes...')
    console.log('Attribute Index: ' + data_attribute_index)
    console.log('Attribute Type: ' + data_attribute_type)

    console.table(this.state)

    let newState = this.state;

    newState.attributes[data_attribute_index].value = newValue

    this.setState(newState)
  }

  toggleCollapsed() {
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