import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export class BlazeEditUserComponent extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.updateUser,this.refs.container);
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  render() {
    return <span ref="container"/>;
  }
}