import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField'
import {FieldType, registerType} from 'simple-react-form';
import { ChromePicker } from 'react-color';


const propTypes = {
  ...FieldType.propTypes,
  fieldType: React.PropTypes.string
}

const defaultProps = {
  ...FieldType.defaultProps
}


class CCColorPicker extends Component {

  constructor(props) {
    super(props);
    this.type = 'colorpicker';
    this.state = {
      value: props.value,
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  onChange(value) {
    this.setState({ value: value })
    this.props.onChange(value.hex);
  }

  render() {
    return (
      <div>
        <p>{this.props.label}</p>
        <ChromePicker
          color={this.state.value || ''}
          onChangeComplete={this.onChange}
          //ref='input'
        />
        <TextField ref='input' style={{'visibility':'hidden'}} value={this.state.value || ''}
          onChange={this.onChange}
          {...this.props.passProps}
          floatingLabelText={this.props.useHint ? null : this.props.label}
          hintText={this.props.useHint ? this.props.label : null}
        />
        <p>{this.props.errorMessage}</p>
      </div>
    );
  }
}


CCColorPicker.propTypes = propTypes
CCColorPicker.defaultProps = defaultProps

export default CCColorPicker;
