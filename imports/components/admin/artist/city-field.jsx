import React, { Component, PropTypes } from 'react';
import {Field} from 'simple-react-form';

export default class CityFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.cityOptions = this.cityOptions.bind(this);
  }

  cityOptions() {
    console.dir(this.props.cities);
    return this.props.cities.map((city) => {
      return {'label':city.displayName, 'value':city._id};
    });
  }

  render() {
    return <Field id='citySelectID' fieldName='cityId' options={this.cityOptions()}/>;
  }
}
