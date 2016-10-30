import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import { connect } from 'react-redux';
import {Form, Field} from 'simple-react-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import DashboardComponent from '../dashboard.jsx';
import {LocationsCollection} from '/lib/collections/locations.js';

class LocationCreateComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.showSuccessMessage = this.showSuccessMessage.bind(this);
    this.cityOptions = this.cityOptions.bind(this);
  }

  cityOptions() {
    return this.props.cities.map((city) => {
      return {'label':city.displayName, 'value':city._id};
    });
  }

  showSuccessMessage() {
    this.setState({successMessage: 'Location created.'})
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
        <h1>Create Location</h1>
        {!this.state.successMessage ? '' :
          <MuiThemeProvider>
            <Paper style={style} zDepth={3}>{this.state.successMessage}</Paper>
          </MuiThemeProvider>
        }
        <MuiThemeProvider>
          <Form
            collection={LocationsCollection}
            type='insert'
            ref='form'
            onSuccess={this.showSuccessMessage}
          >
          <Field fieldName='name'/>
          <Field fieldName='type'/>
          <Field id='citySelectID' fieldName='cityId' options={this.cityOptions()}/>
          <Field fieldName='geolocation'/>
          <Field fieldName='description'/>
          <Field fieldName='photo'/>
          <Field fieldName='photoCredit'/>
          <Field fieldName='website'/>
          <Field fieldName='isFeatured'/>
          </Form>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton label='Back' onTouchTap={() => FlowRouter.go('admin-location')}/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton primary={true} label='Create' onTouchTap={() => this.refs.form.submit()}/>
        </MuiThemeProvider>
      </div>
    </DashboardComponent>);
  }
}

export default createContainer(({id}) => {
  const handler = Meteor.subscribe('all-cities')
  const isLoading = !handler.ready()
  const cities = CitiesCollection.find({},{fields: {displayName:1}}).fetch()
  return {isLoading, cities}
}, LocationCreateComponent)
