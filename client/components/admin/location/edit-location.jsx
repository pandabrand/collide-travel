import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditLocationComponent} from './blaze-edit-location.jsx';

const getLocationEvent = (props, id) => {
    return <BlazeEditLocationComponent id={id} {...props}/>;
}

export default EditLocationComponent = ({props, id}) => {
  return <DashboardComponent content={getLocationEvent(props, id)}/>;
};
