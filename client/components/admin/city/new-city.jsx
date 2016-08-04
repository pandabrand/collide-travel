import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeNewCityComponent} from './blaze-new-city.jsx';

const getNewCity = (props) => {
  return <BlazeNewCityComponent {...props}/>;
}

export default NewCityComponent = ({props}) => {
  return <DashboardComponent content={getNewCity(props)}/>;
};
