import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from '../dashboard.jsx';
import {BlazeEditArtistComponent} from './blaze-edit-artist.jsx';

const getEditArtist = (props, id) => {
    return <BlazeEditArtistComponent id={id} {...props}/>;
}

export default EditArtistComponent = ({props, id}) => {
  return <DashboardComponent content={getEditArtist(props, id)}/>;
};
