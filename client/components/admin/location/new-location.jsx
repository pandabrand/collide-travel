import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeNewLocationComponent} from './blaze-new-location.jsx';

const getNewLocation = (props) => {
  return <BlazeNewLocationComponent {...props}/>;
}

export default NewLocationComponent = ({props}) => {
  return <DashboardComponent content={getNewLocation(props)}/>;
};
