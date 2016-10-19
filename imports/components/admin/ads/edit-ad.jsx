import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditAdComponent} from './blaze-edit-ad.jsx';

const getEditAd = (props) => {
    return <div><h1>HEllo</h1><BlazeEditAdComponent {...props}/></div>;
}

export default EditAdComponent = ({props}) => {
  return <DashboardComponent content={getEditAd(props)}/>;
};
