import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Meteor from 'meteor/meteor';
import { Provider } from 'react-redux';
import Store from '../../../lib/client/store/store.js';

import { LayoutComponent } from './layout.jsx';

//App component - base app
export const AppComponent = ({ads, content}) => (
  <div id="wrapper">
    <Provider store={Store}>
      <LayoutComponent ads={ads} content={content} />
    </Provider>
  </div>
)
