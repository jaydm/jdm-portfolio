import React from 'react';
import { AttributeText, AttributeSelect, AttributeMixed } from './ComponentAttributes'

import './DC.scss';

class DynamicComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      componentClass: props.dataFormat.componentClass,
      componentLabel: props.dataFormat.componentLabel,
      componentAttributes: props.dataFormat.componentAttributes,
      isCollapsed: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.toggleCollapsed = this.toggleCollapsed.bind(this)
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target

    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }

  toggleCollapsed() {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  render() {
    if (this.state.componentAttributes.length === 0) return

    return (
      <div>
        <button onClick={this.toggleCollapsed} className='twistie'>{this.state.isCollapsed ? '<+>' : '<->'}</button><span> {this.state.componentLabel}</span>
        {(!this.state.isCollapsed) &&
          <div>
            {
              this.state.componentAttributes.map((attribute) => {
                const attributeType = attribute.fieldType

                switch (attributeType) {
                  case 'AttributeText': return <div><AttributeText data={attribute} changeHandler={this.handleChange} /><br /></div>
                  case 'AttributeSelect': return <div><AttributeSelect data={attribute} changeHandler={this.handleChange} /><br /></div>
                  case 'AttributeMixed': return <div><AttributeMixed data={attribute} changeHandler={this.handleChange} /><br /></div>
                  default: return null
                }
              })
            }
          </div>
        }
      </div>
    )
  }
}

export default DynamicComponent