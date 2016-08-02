import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Meteor from 'meteor/meteor';
import { Provider } from 'react-redux';
import Store from '../../../lib/client/store/store.js';

import { AdminLayout } from './admin-layout.jsx';

//App component - base app
export const AdminApp = ({content}) => {
  return <div id="wrapper">
    <Provider store={Store}>
      <AdminLayout content={content} />
    </Provider>
  </div>;
}
