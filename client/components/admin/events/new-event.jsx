import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeNewEventComponent} from './blaze-new-event.jsx';

const getNewEvent = (props) => {
  return <BlazeNewEventComponent {...props}/>;
}

export default NewEventComponent = ({props}) => {
  return <DashboardComponent content={getNewEvent(props)}/>;
};
