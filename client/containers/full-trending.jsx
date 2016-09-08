import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import { composeWithTracker } from 'react-komposer';

import FullTrendingComponent  from '../components/trending/full-trending.jsx';
import SpinnerComponent from '../components/includes/spinner.jsx';

const composer = (props, onData) => {
  Meteor.call('get.feed.full', (err, res) => {
    const trendingData = {res, props}
    onData(null, trendingData);
  });
};

export default composeWithTracker(composer,SpinnerComponent)(FullTrendingComponent);
