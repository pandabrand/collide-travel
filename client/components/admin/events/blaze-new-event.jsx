import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import Dashboard from '../dashboard.jsx';

export class BlazeNewEvent extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.addNewEvent,this.refs.container);
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  render() {
    return <span ref="container"/>;
  }
}
