import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeNewMagazineComponent} from './blaze-new-magazine.jsx';

const getNewMagazine = (props) => {
  return <BlazeNewMagazineComponent {...props}/>;
}

export default NewMagazineComponent = ({props}) => {
  return <DashboardComponent content={getNewMagazine(props)}/>;
};
