import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import Moment from 'momentjs';

import Dashboard from '../dashboard.jsx';
import {BlazeNewEvent} from './blaze-new-event.jsx';

const getNewEvent = (props) => {
  return <BlazeNewEvent {...props}/>;
}

export default NewEvent = ({props}) => {
  return <Dashboard content={getNewEvent(props)}/>;
};
