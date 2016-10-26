import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { CitiesCollection } from '/lib/collections/cities.js';

import {CityTableComponent} from '/imports/components/admin/city/city-table.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const pagination = new Meteor.Pagination(CitiesCollection);

const composer = (props, onData) => {
  const cityTable = pagination.getPage();
  if(pagination.ready()) {
    const cityData = {cityTable, pagination, props};
    onData(null, cityData);
  }
};

const AdminCityContainer = composeWithTracker(composer, SpinnerComponent)(CityTableComponent);

export default connect()(AdminCityContainer);
