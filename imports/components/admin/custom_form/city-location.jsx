import React from 'react'
import TextField from 'material-ui/TextField'
import Geosuggest from 'react-geosuggest';

export default class CityGeoLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value : props.value,
      suggest: props.suggest
    };
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ value: nextProps.value })
  }

  onChange(value) {
    this.setState({value: value});
    // this.props.onChange(value);
  }

  onSuggestSelect(suggest) {
    // console.dir(suggest);
    this.setState({suggest: suggest});
    this.props.onChange({
      displayName: suggest.gmaps.address_components[0].long_name,
      state: suggest.gmaps.address_components[2].long_name,
      'location.lat': suggest.location.lat,
      'location.lng': suggest.location.lng,
    });
  }

  render() {
    return (
      <div>
        <p>
          {this.props.label}
        </p>
        <Geosuggest
          initialValue={this.state.value ? this.state.value.displayName : ''}
          placeholder='Search for location'
          types={this.props.types || null}
          onChange={this.onChange}
          onSuggestSelect={this.onSuggestSelect}
        />
        <TextField ref='input' style={{'visibility':'hidden'}} value={this.state.suggest || ''}
          onChange={this.onChange}
          floatingLabelText={this.props.useHint ? null : this.props.label}
          hintText={this.props.useHint ? this.props.label : null}
        />
        <p>
          {this.props.errorMessage}
        </p>
      </div>
    );
  }
}
