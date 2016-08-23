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
    Session.setDefault('item', null);
    Meteor.call('get.feed', (err, res) => {
      Session.set('item', res);
      trendingArticles = [];
      const trendingData = {trendingArticles, props}
      onData(null, trendingData);
    });
};

export default composeWithTracker(composer,Loading)(TrendingComponent);
