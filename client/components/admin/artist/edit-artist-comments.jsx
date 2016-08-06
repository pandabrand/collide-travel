import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditArtistCommentsComponent} from './blaze-edit-artist-comments.jsx';

const getEditArtistComments = (props, id) => {
    return <BlazeEditArtistCommentsComponent id={id} {...props}/>;
}

export default EditArtistComponent = ({props, id}) => {
  return <DashboardComponent content={getEditArtistComments(props, id)}/>;
};
