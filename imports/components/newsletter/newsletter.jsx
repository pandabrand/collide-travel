import React, { PropTypes,  Component } from 'react';
import {Form, Field, FieldType, Text} from 'simple-react-form';
import { TextField, EmailField } from 'simple-react-form-bootstrap/lib/fields/string';

const propTypes = {
  errorMessages: React.PropTypes.object,
  emailError: React.PropTypes.string,
  successMessage: React.PropTypes.string,
};

const defaultProps = {
  errorMessages: {},
  emailError: '',
  successMessage: '',
};

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


export default class NewsletterComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emailError: '',
      successMessage: '',
    };
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
  }

  render() {
    return (
      <div className="fluid-container">
        <h1 className="main-title">NEWSLETTER</h1>
        <div className="row newsletter-row">
          <div className="row">
            <div className="description">
              Let Culture Collide come to you. Sign up for our national newsletter to stay connected with the best in music and culture. Then opt in to your city edition to get the weekly scoop on everything that matters to you, from must-see local shows and ticket giveaways, to artist spotlights and neighborhood guides.
            </div>
            <h3>Subscribe to our mailing list</h3>
            <div className="cc-form-container">
              {showErrors(this.state.emailError)}
              {showSuccess(this.state.successMessage)}
              <Form state={this.state} onChange={changes => this.setState(changes)} type="function" errorMessages={this.context.errorMessages} onSubmit={this.handleSubmit} onSuccess={this.handleSuccess} clearOnSuccess={true}>
                <Field fieldName="emailAddress" label="Email Address" type={EmailField} />
                <Field fieldName="firstName" label="First Name" type={TextField} />
                <Field fieldName="lastName" label="Last Name" type={TextField} />
                <Field fieldName="zipCode" label="Zip Code" type={TextField} />
                <Field fieldName="city" label="City" type={TextField} />
                <button className="btn btn-default" href="#" role="button">Subscribe</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewsletterComponent.propTypes = propTypes;
NewsletterComponent.defaultProps = defaultProps;
