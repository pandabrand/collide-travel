import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { LocationsCollection } from '/lib/collections/locations.js';
import { CitiesCollection } from '/lib/collections/cities.js';

import {LocationTableComponent} from '/imports/components/admin/location/location-table.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';
import { Subs } from '/imports/containers/subs.js';

const pagination = new Meteor.Pagination(LocationsCollection);

const composer = (props, onData) => {
  const locations = pagination.getPage();
  const subscription = Subs.subscribe('locations-text-search');
  if(pagination.ready() && subscription.ready()) {
    const city_sub = Meteor.subscribe('all-cities');
    const locationsTextSearch = LocationsCollection.find({},{fields:{name:1},sort:{name:1}});
    if(city_sub.ready()) {
      cities = CitiesCollection.find({},{displayName:1}).fetch();
      const locationData = {locations, cities, pagination, locationsTextSearch, props};
      onData(null, locationData);
    }
  }
};

const AdminLocationContainer = composeWithTracker(composer, SpinnerComponent)(LocationTableComponent);

export default connect()(AdminLocationContainer);
