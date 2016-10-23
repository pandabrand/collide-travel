import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeNewUserComponent} from './blaze-new-user.jsx';

export default AddNewUserComponent = ({props}) => {
  return <DashboardComponent><BlazeNewUserComponent {...props}/></DashboardComponent>;
};
