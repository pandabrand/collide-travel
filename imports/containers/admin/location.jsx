import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { LocationsCollection } from '/lib/collections/locations.js';
import { CitiesCollection } from '/lib/collections/cities.js';

import {LocationTableComponent} from '/imports/components/admin/location/location-table.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const pagination = new Meteor.Pagination(LocationsCollection);

const composer = (props, onData) => {
  const locations = pagination.getPage();
  if(pagination.ready()) {
    const city_sub = Meteor.subscribe('all-cities');
    if(city_sub.ready()) {
      cities = CitiesCollection.find({},{displayName:1}).fetch();
      const locationData = {locations, cities, pagination, props};
      onData(null, locationData);
    }
  }
};

const AdminLocationContainer = composeWithTracker(composer, SpinnerComponent)(LocationTableComponent);

export default connect()(AdminLocationContainer);
