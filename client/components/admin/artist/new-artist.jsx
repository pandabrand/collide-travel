import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeNewArtistComponent} from './blaze-new-artist.jsx';

const getNewArtist = (props) => {
  return <BlazeNewArtistComponent {...props}/>;
}

export default NewArtistComponent = ({props}) => {
  return <DashboardComponent content={getNewArtist(props)}/>;
};
