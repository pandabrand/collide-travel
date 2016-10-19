import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { MagazinesCollection } from '/lib/collections/magazines.js';

import {MagazineTableComponent} from '/imports/components/admin/magazine/magazine-table.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('magazines');
  if(subscription.ready()) {
    const magazines = MagazinesCollection.find().fetch();
    const magazineData = {magazines, props};
    onData(null, magazineData);
  }
};

const AdminMagazineContainer = composeWithTracker(composer, SpinnerComponent)(MagazineTableComponent);

export default connect()(AdminMagazineContainer);
