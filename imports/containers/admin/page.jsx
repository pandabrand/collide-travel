import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { PagesCollection } from '/lib/collections/pages.js';

import {PageTableComponent} from '/imports/components/admin/page/page-table.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('pages');
  if(subscription.ready()) {
    const pages = PagesCollection.find().fetch();
    const pageData = {pages, props};
    onData(null, pageData);
  }
};

const AdminPageContainer = composeWithTracker(composer, SpinnerComponent)(PageTableComponent);

export default connect()(AdminPageContainer);
