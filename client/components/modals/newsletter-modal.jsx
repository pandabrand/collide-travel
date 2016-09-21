import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import classnames from 'classnames';
import Modal  from './modal.jsx';
import {Form, Field, FieldType, Text} from 'simple-react-form';
import { TextField, EmailField } from 'simple-react-form-bootstrap/lib/fields/string';

validateEmail = (email) => {
  var re = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/igm;
  return re.test(email);
}

showErrors = (emailError) => {
  return emailError ? <div className="alert alert-danger" role="alert">{emailError}</div> : '';
}

showSuccess = (successMessage) => {
  return successMessage ? <div className="alert alert-success" role="alert">{successMessage}</div> : '';
}

export default class NewsletterModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      emailError: '',
      successMessage: '',
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    Session.setDefault('modalShown', false);
  }

  openModal() {
    if(!Session.get('modalShown')) {
      this.setState({
        isOpen: true,
      });
    }
  }

  closeModal() {
    Session.set('modalShown',true);
    this.setState({
      isOpen: false,
    });
  }

  componentDidMount() {
    window.setTimeout(this.openModal, 3000);
  }

  handleSubmit = () => {
    formToValidate = this.state;
    Meteor.call('add.subscriber', formToValidate, (err, res) => {
      if(!err) {
        return res;
      } else {
        return err;
      }
    });
  }

  handleSuccess = () => {
    this.setState({successMessage: 'Thank you for subscribing!', emailError: ''});
    window.setTimeout(this.closeModal, 1500);
  }

  render () {
      return (
        <div>

          <Modal
            isOpen={ this.state.isOpen }
            close={ this.closeModal }
            title={ this.props.title}
            shouldCloseOnOverlayClick= {this.props.shouldCloseOnOverlayClick}>
            <div className="newsletter-modal-text">{ this.props.text}</div>
            {showErrors(this.state.emailError)}
            {showSuccess(this.state.successMessage)}
            <Form state={this.state} onChange={changes => this.setState(changes)} type="function" errorMessages={this.context.errorMessages} onSubmit={this.handleSubmit} onSuccess={this.handleSuccess} clearOnSuccess={true}>
              <Field fieldName="emailAddress" label="Email Address" type={EmailField} />
              <button className="btn btn-default" href="#" role="button">Subscribe</button>
            </Form>
            <button className="close-button" onClick={ this.closeModal }>Close</button>
          </Modal>

        </div>
      );
  }
};
