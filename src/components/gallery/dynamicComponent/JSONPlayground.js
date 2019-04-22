import React from 'react';

class JSONPlayground extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: props.name,
      value: JSON.stringify(props.json),
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <textarea onChange={this.handleChange} value={this.state.value} />
    )
  }
}

export default JSONPlayground