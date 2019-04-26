import React from 'react';

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

    this.handleChange = this.props.handleChange.bind(this)
    this.toggleCollapsed = this.toggleCollapsed.bind(this)
  }

  toggleCollapsed() {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  render = () =>
    ((this.state.componentAttributes.length === 0) ? null :
      <div className='dcc--container' >
        <div className='dcc--twistie'>
          <button onClick={this.toggleCollapsed}>{this.state.isCollapsed ? '<+>' : '<->'}</button>
        </div>
        <div className='dcc--name'>
          {this.state.componentLabel}
        </div>
        <div></div>
        {
          (
            this.state.isCollapsed ? null :
              (
                this.state.componentAttributes.forEach((attribute) =>
                  (
                    < div className='dcc--label' > {attribute.fieldLabel}: </div> +
                    ((attribute.fieldType === 'AttributeText') &&
                      (attribute.fieldType === 'AttributeMixed') ? <div className='dcc--data'></div> :
                      <div className='dcc--data'>
                        <input
                          type='text'
                          id={attribute.fieldID}
                          name={attribute.fieldName + '-' + attribute.fieldID}
                          value={attribute.fieldValue}
                          length={attribute.fieldLength}
                          onChange={this.changeHandler}
                        />
                        {
                          ((attribute.fieldType !== 'AttributeMixed') ? null :
                            <select onChange={this.changeHandler} value={attribute.fieldValue}>
                              {attribute.fieldOptions.length > 0 && attribute.fieldOptions.map(option => <option value={option}>{option}</option>)}
                            </select>
                          )
                        }
                      </div>
                    )
                  )
                )
              )
          )
        }
      </div >
    )
}

export default DynamicComponent