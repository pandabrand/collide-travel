import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Meteor from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import UIHeader from './header.jsx';
import UIFooter from './footer.jsx';

//App component - base app
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="wrapper">
        <UIHeader/>
        <div className="container" id="main">This is the main container.</div>
        <UIFooter/>
      </div>

    );
  }
}
