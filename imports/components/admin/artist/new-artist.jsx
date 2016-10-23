import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeNewArtistComponent} from './blaze-new-artist.jsx';

export default NewArtistComponent = ({props}) => {
  return <DashboardComponent><BlazeNewArtistComponent {...props}/></DashboardComponent>;
};
