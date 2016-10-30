import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import { connect } from 'react-redux';
import {Form, Field} from 'simple-react-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import DashboardComponent from '../dashboard.jsx';
import {ArtistsCollection} from '/lib/collections/artists.js';
import {CitiesCollection} from '/lib/collections/cities.js';
import {LocationsCollection} from '/lib/collections/locations.js';

const propTypes = {
  cityValue: React.PropTypes.object
}

class ArtistCreateComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cityValue: '',
    };
    this.showSuccessMessage = this.showSuccessMessage.bind(this);
    this.cityOptions = this.cityOptions.bind(this);
    this.locationOptions = this.locationOptions.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  cityOptions() {
    return this.props.cities.map((city) => {
      return {'label':city.displayName, 'value':city._id};
    });
  }

  locationOptions() {
    const cityId = this.state.cityValue || '';
    const locationsFiltered = cityId ? _.where(this.props.locations, {cityId:cityId}) : this.props.locations;
    return locationsFiltered.map((location)=> {
      return {'label':location.name,'value':location._id};
    });
  }


  showSuccessMessage() {
    this.setState({successMessage: 'Artist created.'})
    document.getElementById('formtop').scrollIntoView({behavior:'smooth'})
    setTimeout(() => {
      this.setState({successMessage: null})
      FlowRouter.go('admin-page');
    }, 3000);
  }

  onChange(value) {
    this.setState({cityValue: value});
    this.props.onChange(value);
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
        <h1>Create Artist</h1>
        {!this.state.successMessage ? '' :
          <MuiThemeProvider>
            <Paper style={style} zDepth={3}>{this.state.successMessage}</Paper>
          </MuiThemeProvider>
        }
        <MuiThemeProvider>
          <Form
            collection={ArtistsCollection}
            type='insert'
            ref='form'
            onSuccess={this.showSuccessMessage}
          >
          <Field fieldName='artistName'/>
          <Field id='citySelectID' value={this.state.cityValue} onChange={this.onChange} fieldName='cityId' options={this.cityOptions()}/>
          <Field id='optionSelectID' fieldName='locationIds' options={this.locationOptions()}/>
          <Field fieldName='image'/>
          <Field fieldName='photoCredit'/>
          <Field fieldName='description'/>
          <Field fieldName='color'/>
          <Field fieldName='soundcloud'/>
          <Field fieldName='isFeatured'/>
          </Form>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton label='Back' onTouchTap={() => FlowRouter.go('admin-artist')}/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton primary={true} label='Create' onTouchTap={() => this.refs.form.submit()}/>
        </MuiThemeProvider>
      </div>
    </DashboardComponent>);
  }
}

ArtistCreateComponent.propTypes = propTypes;

export default createContainer(() => {
  const handler = Meteor.subscribe('cities-and-locations')
  const isLoading = !handler.ready()
  const cities = CitiesCollection.find({},{fields: {displayName:1}}).fetch()
  const locations = LocationsCollection.find({}, {fields: {name:1, cityId:1}}).fetch()
  return {isLoading, cities, locations}
}, ArtistCreateComponent)
