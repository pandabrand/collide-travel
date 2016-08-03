import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Meteor from 'meteor/meteor';
import { Provider } from 'react-redux';
import Store from '../../../lib/client/store/store.js';

import { AdminLayoutComponent } from './admin-layout.jsx';

//App component - base app
export const AdminAppComponent = ({content}) => {
  return <div id="wrapper">
    <Provider store={Store}>
      <AdminLayoutComponent content={content} />
    </Provider>
  </div>;
}
