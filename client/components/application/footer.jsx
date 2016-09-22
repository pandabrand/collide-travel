import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

//Footer Component
export default class UIFooterComponent extends Component {
  render() {
    return (
      <footer id="footer" className="push">
      	<div className="container">
      		<div className="text-center footLinks">
      			© 2016 Culture Collide &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      			<a href="/terms">Terms &amp; Conditions</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      			<a href="/privacy">Privacy Policy</a>
      		</div>
      	</div>
      	<div className="row">
      		<div className="col-md-6 text-right page-scroll">
      		</div>

      	</div>
      </footer>
    );
  }
}
