import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Meteor from 'meteor/meteor';
import { Provider } from 'react-redux';
import Store from '../../../lib/client/store/store.js';

import { Layout } from './layout.jsx';

//App component - base app
export const App = ({content}) => (
  <div id="wrapper">
    <Provider store={Store}>
      <Layout content={content} />
    </Provider>
  </div>
)
