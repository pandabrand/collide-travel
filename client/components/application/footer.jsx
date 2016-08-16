import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

//Footer Component
export default class UIFooterComponent extends Component {
  render() {
    return (
      <footer id="footer"><div className="container">&copy; {new Date().getFullYear()} Culture Collide</div></footer>
    );
  }
}
