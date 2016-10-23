import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditCityComponent} from './blaze-edit-city.jsx';

export default EditCityComponent = ({props, id}) => {
  return <DashboardComponent><BlazeEditCityComponent id={id} {...props}/></DashboardComponent>;
};
