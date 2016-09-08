import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import { composeWithTracker } from 'react-komposer';
import { AdZoneCollection } from '../../lib/collections/ad-zone.js';

import TrendingComponent  from '../components/trending/trending.jsx';
import SpinnerComponent from '../components/includes/spinner.jsx';

const composer = (props, onData) => {
  const adSubscription = Meteor.subscribe('get-ad');
  if(adSubscription.ready()) {
    Session.setDefault('item', null);
    const ads = AdZoneCollection.findOne({});
    Meteor.call('get.feed.partial', (err, res) => {
      // if(!err) {
        Session.set('item', res);
        trendingArticles = [];
        const trendingData = {trendingArticles, res, ads, props}
        onData(null, trendingData);
      // } else {
      //   console.dir(err);
      //   const trendingData = {ads, props}
      //   onData(null, trendingData);
      // }
    });
  }
};

export default composeWithTracker(composer,SpinnerComponent)(TrendingComponent);
