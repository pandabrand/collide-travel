import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditUserComponent} from './blaze-edit-user.jsx';

const getEditUser = (props, id) => {
    return <BlazeEditUserComponent id={id} {...props}/>;
}

export default EditUserComponent = ({props, id}) => {
  return <DashboardComponent content={getEditUser(props, id)}/>;
};
