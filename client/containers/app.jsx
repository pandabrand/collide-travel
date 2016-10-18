import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { AdZoneCollection } from '../../lib/collections/ad-zone.js';

import  {AppComponent}  from '../components/application/App.jsx';
import SpinnerComponent from '../components/includes/spinner.jsx';
import { subs } from './subs.js';

const composer = (props, onData) => {
  const adSubscription = subs.subscribe('get-ad');
  if(adSubscription.ready()) {
    ads = AdZoneCollection.findOne({});
    const adData = {ads, props}
    onData(null, adData);
  }
};

export default composeWithTracker(composer, SpinnerComponent)(AppComponent);
