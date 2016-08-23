import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import { composeWithTracker } from 'react-komposer';

import ContestComponent  from '../components/contests/contests.jsx';

const Loading = () => (<div className="trending-loading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
</div>);

const composer = (props, onData) => {
    Session.setDefault('contestItem', null);
    Meteor.call('get.contest', (err, res) => {
      Session.set('contestItem', res);
      trendingArticles = [];
      const trendingData = {props}
      onData(null, trendingData);
    });
};

export default composeWithTracker(composer,Loading)(ContestComponent);
