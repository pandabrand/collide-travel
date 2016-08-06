import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeNewPageComponent} from './blaze-new-page.jsx';

const getNewPage = (props) => {
  return <BlazeNewPageComponent {...props}/>;
}

export default NewPageComponent = ({props}) => {
  return <DashboardComponent content={getNewPage(props)}/>;
};
