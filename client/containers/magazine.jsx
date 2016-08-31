import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { AdZoneCollection } from '../../lib/collections/ad-zone.js';

import  PrintPageComponent  from '../components/print-page/print-page.jsx';
import SpinnerComponent from '../components/includes/spinner.jsx';

const composer = (props, onData) => {
  const citySubscription = Meteor.subscribe('cities');
  const adSubscription = Meteor.subscribe('get-ad');
  if(citySubscription.ready() && adSubscription.ready()) {
    cities = CitiesCollection.find({},{sort:{isFeature: -1, displayName: 1}});
    ads = AdZoneCollection.findOne({});
    const cityData = {cities, ads, props}
    onData(null, cityData);
  }
};

export default composeWithTracker(composer, SpinnerComponent)(PrintPageComponent);
