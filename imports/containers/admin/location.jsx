import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { LocationsCollection } from '/lib/collections/locations.js';
import { CitiesCollection } from '/lib/collections/cities.js';

import {LocationTableComponent} from '/imports/components/admin/location/location-table.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('all-locations');
  const city_sub = Meteor.subscribe('cities');
  if(subscription.ready()) {
    const locations = LocationsCollection.find().fetch();
    let cities = {};
    if(city_sub.ready()) {
      cities = CitiesCollection.find({},{displayName:1}).fetch();
      const locationData = {locations, cities, props};
      onData(null, locationData);
    }
  }
};

const AdminLocationContainer = composeWithTracker(composer, SpinnerComponent)(LocationTableComponent);

export default connect()(AdminLocationContainer);
