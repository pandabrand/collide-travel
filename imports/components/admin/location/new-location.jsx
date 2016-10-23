import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeNewLocationComponent} from './blaze-new-location.jsx';

export default NewLocationComponent = ({props}) => {
  return <DashboardComponent><BlazeNewLocationComponent {...props}/></DashboardComponent>;
};
