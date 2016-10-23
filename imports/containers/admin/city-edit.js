import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { CitiesCollection } from '/lib/collections/cities.js';

import CityEditComponent from '/imports/components/admin/city/edit-city.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('edit-city', props.id);
  if(subscription.ready()) {
    const city = CitiesCollection.findOne({_id:props.id});
    const cityData = {city, props};
    onData(null, cityData);
  }
};

const EditCityContainer = composeWithTracker(composer, SpinnerComponent)(CityEditComponent);

export default connect()(EditCityContainer);
