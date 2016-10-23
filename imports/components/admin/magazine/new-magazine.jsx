import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeNewMagazineComponent} from './blaze-new-magazine.jsx';

export default NewMagazineComponent = ({props}) => {
  return <DashboardComponent><BlazeNewMagazineComponent {...props}/></DashboardComponent>;
};
