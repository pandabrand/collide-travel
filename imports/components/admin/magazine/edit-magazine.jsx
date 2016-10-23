import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditMagazineComponent} from './blaze-edit-magazine.jsx';

export default EditMagazineComponent = ({props, id}) => {
  return <DashboardComponent><BlazeEditMagazineComponent id={id} {...props}/></DashboardComponent>;
};
