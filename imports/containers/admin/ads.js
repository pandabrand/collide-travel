import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import AdZoneCollection from '/lib/collections/ad-zone.js';

import EditAdComponent from '/imports/components/admin/ads/edit-ad.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('get-ad');
  if(subscription.ready()) {
    const ad = AdZoneCollection.findOne({});
    const adData = {ad, props};
    onData(null, adData);
  }
};

const EditAdContainer = composeWithTracker(composer, SpinnerComponent)(EditAdComponent);

export default connect()(EditAdContainer);
