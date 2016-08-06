import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditPageComponent} from './blaze-edit-page.jsx';

const getPage = (props, id) => {
    return <BlazeEditPageComponent id={id} {...props}/>;
}

export default EditPageComponent = ({props, id}) => {
  return <DashboardComponent content={getPage(props, id)}/>;
};
