import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';

import  PrintPageComponent  from '../components/print-page/print-page.jsx';

const composer = (props, onData) => {
  const citySubscription = Meteor.subscribe('cities');
  if(citySubscription.ready()) {
    cities = CitiesCollection.find({});
    const cityData = {cities, props}
    onData(null, cityData);
  }
};

export default composeWithTracker(composer)(PrintPageComponent);
