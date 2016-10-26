import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import {AdZoneCollection} from '/lib/collections/ad-zone.js';
import { Subs } from '/imports/containers/subs.js';

import EditAdComponent from '/imports/components/admin/ads/edit-ad.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const composer = (props, onData) => {
  const subscription = Subs.subscribe('get-ad');
  if(subscription.ready()) {
    const ad = _.first(AdZoneCollection.find().fetch());
    const adData = {ad, props};
    onData(null, adData);
  }
};

const EditAdContainer = composeWithTracker(composer, SpinnerComponent)(EditAdComponent);

export default connect()(EditAdContainer);
