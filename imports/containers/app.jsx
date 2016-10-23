import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import {AdZoneCollection} from '/lib/collections/ad-zone.js';

import  {AppComponent}  from '/imports/components/application/App.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';
import { Subs } from '/imports/containers/subs.js';

const composer = (props, onData) => {
  const adSubscription = Subs.subscribe('get-ad');
  if(adSubscription.ready()) {
    const ads = AdZoneCollection.findOne({});
    const adData = {ads, props}
    onData(null, adData);
  }
};

export default composeWithTracker(composer, SpinnerComponent)(AppComponent);
