import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

//Footer Component
export default class UIFooter extends Component {
  render() {
    return (
      <footer id="footer"><div className="container">This is a footer.</div></footer>
    );
  }
}
