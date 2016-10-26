import React from 'react'
import TextField from 'material-ui/TextField'

export default class ShortText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value : props.value,
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ value: nextProps.value })
  }

  onChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div>
        <p>
          {this.props.label}
        </p>
        <TextField
        value={this.state.value || ''}
        hintText='Image Url'
        onChange={this.onChange.bind(this)} />
        <p>
          {this.props.errorMessage}
        </p>
      </div>
    );
  }
}
