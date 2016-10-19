import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditMagazineComponent} from './blaze-edit-magazine.jsx';

const getMagazineEvent = (props, id) => {
    return <BlazeEditMagazineComponent id={id} {...props}/>;
}

export default EditMagazineComponent = ({props, id}) => {
  return <DashboardComponent content={getMagazineEvent(props, id)}/>;
};
