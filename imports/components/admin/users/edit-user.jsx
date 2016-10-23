import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditUserComponent} from './blaze-edit-user.jsx';

export default EditUserComponent = ({props, id}) => {
  return <DashboardComponent><BlazeEditUserComponent id={id} {...props}/></DashboardComponent>;
};
