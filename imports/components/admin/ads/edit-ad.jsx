import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Form, Field} from 'simple-react-form';
import Textarea from 'simple-react-form-material-ui/lib/textarea'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton'
import AdZoneCollection from '/lib/collections/ad-zone.js';

import DashboardComponent from '../dashboard.jsx';
// import {BlazeEditAdComponent} from './blaze-edit-ad.jsx';

const submitForm = () => {
  const form = $('form');
  form.submit();
}

const getEditAd = (props, ad) => {
    return <div>
      <h1>Edit Ad</h1>
      <MuiThemeProvider>
        <Form
          collection={AdZoneCollection}
          type='update'
          doc={ad}
        >
        </Form>
      </MuiThemeProvider>
      <MuiThemeProvider>
        <RaisedButton primary={true} label='Update' onTouchTap={() => submitForm()}/>
      </MuiThemeProvider>
    </div>;
}

export default EditAdComponent = ({props, ad}) => {
  return <DashboardComponent content={getEditAd(props, ad)}/>;
};
