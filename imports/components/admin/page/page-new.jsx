import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import { connect } from 'react-redux';
import {Form} from 'simple-react-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import DashboardComponent from '../dashboard.jsx';
import {PagesCollection} from '/lib/collections/pages.js';

export default class PageCreateComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.showSuccessMessage = this.showSuccessMessage.bind(this);
  }


  showSuccessMessage() {
    this.setState({successMessage: 'Page created.'})
    document.getElementById('formtop').scrollIntoView({behavior:'smooth'})
    setTimeout(() => {
      this.setState({successMessage: null})
      FlowRouter.go('admin-page');
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
        <h1>Edit Page</h1>
        {!this.state.successMessage ? '' :
          <MuiThemeProvider>
            <Paper style={style} zDepth={3}>{this.state.successMessage}</Paper>
          </MuiThemeProvider>
        }
        <MuiThemeProvider>
          <Form
            collection={PagesCollection}
            type='insert'
            ref='form'
            onSuccess={this.showSuccessMessage}
          >
          </Form>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton label='Back' onTouchTap={() => FlowRouter.go('admin-page')}/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton primary={true} label='Create' onTouchTap={() => this.refs.form.submit()}/>
        </MuiThemeProvider>
      </div>
    </DashboardComponent>);
  }
}
