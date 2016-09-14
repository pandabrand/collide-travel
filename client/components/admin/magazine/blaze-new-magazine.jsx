import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import DashboardComponent from '../dashboard.jsx';

export class BlazeNewMagazineComponent extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.addNewMagazine,this.refs.container);
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  render() {
    return <span ref="container"/>;
  }
}
