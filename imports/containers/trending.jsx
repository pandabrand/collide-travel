import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import { composeWithTracker } from 'react-komposer';
import { TrendingCollection } from '/lib/collections/trending.js';
import { AdZoneCollection } from '/lib/collections/ad-zone.js';
import { Subs } from '/imports/containers/subs.js';

import TrendingComponent  from '/imports/components/trending/trending.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const composer = (props, onData) => {
  const subscription = Subs.subscribe('get-trending');
  if(subscription.ready()) {
    const res = TrendingCollection.find({},{limit:3,sort:{_id:-1}}).fetch();
    const trendingData = {res, props}
    onData(null, trendingData);
  }
};

export default composeWithTracker(composer,SpinnerComponent)(TrendingComponent);
