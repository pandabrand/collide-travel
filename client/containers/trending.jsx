import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import { composeWithTracker } from 'react-komposer';
import { TrendingCollections } from '../../lib/collections/trending.js';

import TrendingComponent  from '../components/trending/trending.jsx';

const Loading = () => (<div className="trending-loading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
</div>);

const composer = (props, onData) => {
  if(Meteor.isServer) {
    Meteor.call('get.feed');
  }
  const trendingSubscription = Meteor.subscribe('trending');
  if(trendingSubscription.ready()) {
    trendingArticles = TrendingCollections.find({},{sort:{date:-1},limit:3});
    const trendingData = {trendingArticles, props}
    onData(null, trendingData);
  }
};

export default composeWithTracker(composer,Loading)(TrendingComponent);
