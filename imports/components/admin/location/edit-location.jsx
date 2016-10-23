import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditLocationComponent} from './blaze-edit-location.jsx';

export default EditLocationComponent = ({props, id}) => {
  return <DashboardComponent><BlazeEditLocationComponent id={id} {...props}/></DashboardComponent>;
};
