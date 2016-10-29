import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import { connect } from 'react-redux';
import {Form, Field} from 'simple-react-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import DashboardComponent from '../dashboard.jsx';
import {LocationsCollection} from '/lib/collections/locations.js';
import {CitiesCollection} from '/lib/collections/cities.js';

const propTypes = {
  page: React.PropTypes.object
}

class LocationUpdateComponent extends Component {

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
    this.setState({successMessage: 'Location updated.'})
    document.getElementById('formtop').scrollIntoView({behavior:'smooth'})
    setTimeout(() => {
      this.setState({successMessage: null})
      FlowRouter.go('admin-location');
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
        <h1>Edit Location</h1>
        {!this.state.successMessage ? '' :
          <MuiThemeProvider>
            <Paper style={style} zDepth={3}>{this.state.successMessage}</Paper>
          </MuiThemeProvider>
        }
        <MuiThemeProvider>
          <Form
            collection={LocationsCollection}
            type='update'
            doc={this.props.location}
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
          <div>
            <RaisedButton label='Back' onTouchTap={() => FlowRouter.go('admin-location')}/>
            <RaisedButton primary={true} label='Update' onTouchTap={() => this.refs.form.submit()}/>
          </div>
        </MuiThemeProvider>
      </div>
    </DashboardComponent>);
  }
}

LocationUpdateComponent.propTypes = propTypes;

export default createContainer(({id}) => {
  const handler = Meteor.subscribe('location-and-cities', id)
  const isLoading = !handler.ready()
  const location = LocationsCollection.findOne()
  const cities = CitiesCollection.find({},{fields: {displayName:1}}).fetch()
  return {isLoading, location, cities}
}, LocationUpdateComponent)
