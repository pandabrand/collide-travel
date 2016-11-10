import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField'
import {FieldType, registerType} from 'simple-react-form';
import {createMarkup} from '/lib/utils.js';
import ReactSummernote from './summernote';

const propTypes = {
  ...FieldType.propTypes,
  fieldType: React.PropTypes.string
}

const defaultProps = {
  ...FieldType.defaultProps
}


class HtmlEditor extends Component {

  constructor(props) {
    super(props);
    this.type = 'html';
    this.state = {
      value: props.value,
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  onChange(value) {
    this.setState({ value: value });
    this.props.onChange(value);
  }

  render() {
    return (
      <div>
        <p>{this.props.label}</p>
        <ReactSummernote
          value={this.state.value || ''}
          onChange={this.onChange}
          options={{
            height: 250,
            toolbar: [
              ['block', ['style']],
              ['style', ['bold', 'italic', 'underline', 'clear']],
              ['font', ['strikethrough', 'superscript', 'subscript']],
              ['fontsize', ['fontsize']],
              ['fontfamily',['fontname']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['color', ['color']],
              ['insert',['picture','link','video']],
              ['misc', ['fullscreen','codeview','undo','redo','help']]
            ],
          }}
        />
        <TextField ref='input'
          style={{'visibility':'hidden'}}
          value={this.state.value || ''}
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


HtmlEditor.propTypes = propTypes
HtmlEditor.defaultProps = defaultProps

export default HtmlEditor;
