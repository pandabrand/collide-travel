import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import { connect } from 'react-redux';
import {Form, Field} from 'simple-react-form';
import Textarea from 'simple-react-form-material-ui/lib/textarea'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton'
import {AdZoneCollection} from '/lib/collections/ad-zone.js';
import DashboardComponent from '../dashboard.jsx';

const propTypes = {
  ad: React.PropTypes.object
}

class AdUpdateComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.showSuccessMessage = this.showSuccessMessage.bind(this);
  }

  showSuccessMessage() {
    this.setState({successMessage: 'Ad updated'})
    setTimeout(() => {
      this.setState({successMessage: null})
    }, 1000)
  }

  render() {
    return (<DashboardComponent>
      <div>
        <h1>Edit Ad</h1>
        <MuiThemeProvider>
          <Form
            collection={AdZoneCollection}
            type='update'
            doc={this.props.ad}
            ref='form'
            onSuccess={this.showSuccessMessage}
          >
          </Form>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton label='Back' onTouchTap={() => FlowRouter.go('admin-artist')}/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton primary={true} label='Update' onTouchTap={() => this.refs.form.submit()}/>
        </MuiThemeProvider>
        <div><p>{this.state.showSuccessMessage}</p></div>
      </div>
    </DashboardComponent>);
  }
}

AdUpdateComponent.propTypes = propTypes;

export default createContainer(({}) => {
  const handler = Meteor.subscribe('get-ad')
  const isLoading = !handler.ready()
  const ad = AdZoneCollection.findOne()
  return {isLoading, ad}
}, AdUpdateComponent)
