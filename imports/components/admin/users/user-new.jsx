import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import { connect } from 'react-redux';
import {Form, Field} from 'simple-react-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import DashboardComponent from '../dashboard.jsx';

export default class UserCreateComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.showSuccessMessage = this.showSuccessMessage.bind(this);
  }

  showSuccessMessage() {
    this.setState({successMessage: 'User created.'})
    document.getElementById('formtop').scrollIntoView({behavior:'smooth'})
    setTimeout(() => {
      this.setState({successMessage: null})
      FlowRouter.go('admin-user');
    }, 3000);
  }

  render() {
    const style = {
      height: 100,
      width: 400,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
      backgroundColor: '#e85323',
    };

    return (<DashboardComponent>
      <div id='formtop'>
        <h1>Create Location</h1>
        {!this.state.successMessage ? '' :
          <MuiThemeProvider>
            <Paper style={style} zDepth={3}>{this.state.successMessage}</Paper>
          </MuiThemeProvider>
        }
        <MuiThemeProvider>
          <Form
            collection={Users}
            type='insert'
            ref='form'
            onSuccess={this.showSuccessMessage}
          >
            <Field fieldName='username'/>
            <Field fieldName='emails.0.address'/>
            <Field fieldName='services.password'/>
          </Form>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton label='Back' onTouchTap={() => FlowRouter.go('admin-user')}/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton primary={true} label='Create' onTouchTap={() => this.refs.form.submit()}/>
        </MuiThemeProvider>
      </div>
    </DashboardComponent>);
  }
}
