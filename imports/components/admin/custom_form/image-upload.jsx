import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField'
import styles from 'simple-react-form-material-ui/lib/styles'
import {FieldType, registerType} from 'simple-react-form'
import cloudinary from 'cloudinary';
import {createMarkup, cloudinaryURL} from '/lib/utils.js';

const CLOUDINARY_UPLOAD_PRESET = Meteor.settings.CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_API_KEY = Meteor.settings.public.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = Meteor.settings.CLOUDINARY_API_SECRET;
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/' + Meteor.settings.public.CLOUDINARY_CLOUD_NAME +'/image/upload';

const propTypes = {
  ...FieldType.propTypes,
  fieldType: React.PropTypes.string
}

const defaultProps = {
  ...FieldType.defaultProps
}

export default class ImageUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.type = 'image';
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ value: nextProps.value })
  }

  onChange (event) {
    this.setState({ value: event.target.value })
  }

  handleChange(e) {
    let files = e.currentTarget.files;
    return Cloudinary.upload(files, {}, function(err,res){
      this.setState({
        value: res.public_id
      });
      this.props.onChange(res.public_id);
    }.bind(this));
  }

  render() {
    return <div>
      <div className="fileUpload">
        <p>{this.props.label}</p>
        <input name='file' type='file' ref='file' className='cloudinary-fileupload'
          data-cloudinary-field='image-id' onChange={this.handleChange}/>
          <div style={styles.errorMessage}>{this.props.errorMessage}</div>
      </div>
      <div>
        <div>
          <TextField ref='input'
            floatingLabelText={this.props.useHint ? null : this.props.label}
            hintText={this.props.useHint ? this.props.label : null}
            value={this.state.value || ''}
            onChange={this.handleChange}
            {...this.props.passProps}
          />
          <div className="uploadThumbnailContainer">
            <img width='100' src={cloudinaryURL(this.state.value, 100, null, 'fill', 'auto')} />
          </div>
        </div>
      </div>
    </div>;
  }
}

ImageUpload.propTypes = propTypes
ImageUpload.defaultProps = defaultProps

registerType({
  type: 'image',
  component: ImageUpload
})
