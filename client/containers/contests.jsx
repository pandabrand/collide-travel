import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import { composeWithTracker } from 'react-komposer';

import ContestComponent  from '../components/contests/contests.jsx';
import { AdZoneCollection } from '../../lib/collections/ad-zone.js';
import SpinnerComponent from '../components/includes/spinner.jsx';

const composer = (props, onData) => {
  const adSubscription = Meteor.subscribe('get-ad');
  if(adSubscription.ready()) {
    Session.setDefault('contestItem', null);
    Meteor.call('get.contest', (err, res) => {
      Session.set('contestItem', res);
      trendingArticles = [];
      ads = AdZoneCollection.findOne({});
      const trendingData = {ads, props}
      onData(null, trendingData);
    });
  }
};

export default composeWithTracker(composer,SpinnerComponent)(ContestComponent);
