import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditArtistCommentsComponent} from './blaze-edit-artist-comments.jsx';

export default EditArtistComponent = ({props, id}) => {
  return <DashboardComponent><BlazeEditArtistCommentsComponent id={id} {...props}/></DashboardComponent>;
};
