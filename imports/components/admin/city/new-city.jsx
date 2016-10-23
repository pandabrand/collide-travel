import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeNewCityComponent} from './blaze-new-city.jsx';

export default NewCityComponent = ({props}) => {
  return <DashboardComponent><BlazeNewCityComponent {...props}/></DashboardComponent>;
};
