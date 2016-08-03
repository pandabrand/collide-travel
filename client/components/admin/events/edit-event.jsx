import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import Moment from 'momentjs';

import Dashboard from '../dashboard.jsx';
import {BlazeEditEvent} from './blaze-edit-event.jsx';

const getEditEvent = (props, id) => {
    return <BlazeEditEvent id={id} {...props}/>;
}

export default EditEvent = ({props, id}) => {
  return <Dashboard content={getEditEvent(props, id)}/>;
};
