import React from 'react';

export function AttributeText(props) {
  return (
    <div>
      <label>{props.data.fieldLabel}:&nbsp;
        <input
          type='text'
          id={props.data.fieldID}
          name={props.data.fieldName + '-' + props.data.fieldID}
          value={props.data.fieldValue}
          length={props.data.fieldLength}
          onChange={props.changeHandler}
        />
      </label>
    </div>
  )
}

export function AttributeSelect(props) {
  if (props.data.fieldOptions.length === 0) return null

  return (
    <div>
      <select onChange={props.changeHandler} value={props.data.fieldValue}>
        {props.data.fieldOptions.length > 0 && props.data.fieldOptions.map(option => <option value={option}>{option}</option>)}
      </select>
    </div>
  )
}

export function AttributeMixed(props) {
  return (
    <div>
      <AttributeText data={props.data} /> <AttributeSelect data={props.data} />
    </div>
  )
}

