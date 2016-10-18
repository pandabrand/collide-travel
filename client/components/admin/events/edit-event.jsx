import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditEventComponent} from './blaze-edit-event.jsx';

const getEditEvent = (props, id) => {
    return <BlazeEditEventComponent id={id} {...props}/>;
}

export default EditEventComponent = ({props, id}) => {
  return <DashboardComponent content={getEditEvent(props, id)}/>;
};
