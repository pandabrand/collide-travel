import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { CitiesCollection } from '../../../lib/collections/cities.js';

import {CityTableComponent} from '../../components/admin/city/city-table.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('cities');
  if(subscription.ready()) {
    const cities = CitiesCollection.find().fetch();
    const cityData = {cities, props};
    onData(null, cityData);
  }
};

const AdminCityContainer = composeWithTracker(composer)(CityTableComponent);

export default connect()(AdminCityContainer);
