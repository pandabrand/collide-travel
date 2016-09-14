import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { MagazinesCollection } from '../../lib/collections/magazines.js';
import { AdZoneCollection } from '../../lib/collections/ad-zone.js';

import  PrintPageComponent  from '../components/print-page/print-page.jsx';
import SpinnerComponent from '../components/includes/spinner.jsx';

const composer = (props, onData) => {
  const citySubscription = Meteor.subscribe('city-guides');
  const magazineSubscription = Meteor.subscribe('magazines');
  const adSubscription = Meteor.subscribe('get-ad');
  if(citySubscription.ready() && magazineSubscription.ready() && adSubscription.ready()) {
    cities = CitiesCollection.find({showPrintGuide:true},{sort:{isFeature: -1, displayName: 1}});
    magazines = MagazinesCollection.find({showPrintGuide:true});
    ads = AdZoneCollection.findOne({});
    const cityData = {cities, magazines, ads, props}
    onData(null, cityData);
  }
};

export default composeWithTracker(composer, SpinnerComponent)(PrintPageComponent);
