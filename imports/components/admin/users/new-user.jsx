import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeNewUserComponent} from './blaze-new-user.jsx';

const getNewUser = (props) => {
  return <BlazeNewUserComponent {...props}/>;
}

export default AddNewUserComponent = ({props}) => {
  return <DashboardComponent content={getNewUser(props)}/>;
};
