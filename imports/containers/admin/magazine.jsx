import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { MagazinesCollection } from '/lib/collections/magazines.js';

import {MagazineTableComponent} from '/imports/components/admin/magazine/magazine-table.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const pagination = new Meteor.Pagination(MagazinesCollection);

const composer = (props, onData) => {
  const magazines = pagination.getPage();
  if(pagination.ready()) {
    const magazineData = {magazines, pagination, props};
    onData(null, magazineData);
  }
};

const AdminMagazineContainer = composeWithTracker(composer, SpinnerComponent)(MagazineTableComponent);

export default connect()(AdminMagazineContainer);
