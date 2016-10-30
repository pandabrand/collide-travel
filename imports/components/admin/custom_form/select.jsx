import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import {FieldType, registerType} from 'simple-react-form';
import { DocHead } from 'meteor/kadira:dochead';

// Be sure to include styles at some point, probably during your bootstrapping
// import 'react-select/dist/react-select.css';

const propTypes = {
  ...FieldType.propTypes,
  fieldType: React.PropTypes.string,
  options: React.PropTypes.array
}

const defaultProps = {
  ...FieldType.defaultProps
}


class CCSelect extends Component {

  constructor(props) {
    super(props);
    this.type = 'ccselect';
    this.state = {
      value: props.value,
      options: props.options,
    }
    this.onChange = this.onChange.bind(this);
    const select_link = {rel:"stylesheet", href:"https://unpkg.com/react-select/dist/react-select.css"};
    DocHead.addLink(select_link);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
      options: nextProps.options
    });
  }

  onChange(value, options) {
    this.setState({
      value: value,
      options: options,
    });
    this.props.onChange(value.split(','));
  }

  render() {
    return (
      <div>
        <p>{this.props.label}</p>
        <Select
          name="form-field-name"
          value={this.state.value || ''}
          options={this.state.options}
          onChange={this.onChange}
          multi
          simpleValue
          ref='input'
        />
        <p>{this.props.errorMessage}</p>
      </div>
    );
  }
}


CCSelect.propTypes = propTypes
CCSelect.defaultProps = defaultProps

export default CCSelect;
