import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditCityComponent} from './blaze-edit-city.jsx';

const getCityEvent = (props, id) => {
    return <BlazeEditCityComponent id={id} {...props}/>;
}

export default EditCityComponent = ({props, id}) => {
  return <DashboardComponent content={getCityEvent(props, id)}/>;
};
