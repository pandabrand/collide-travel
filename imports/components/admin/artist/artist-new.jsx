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
  cityValue: React.PropTypes.object,
  cities: React.PropTypes.array.isRequired,
  locations: React.PropTypes.array.isRequired,
}

class ArtistCreateComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cityValue: '',
      changes: {}
    };
    this.showSuccessMessage = this.showSuccessMessage.bind(this);
    this.locationOptions = this.locationOptions.bind(this);
    this.cityOptions = this.cityOptions.bind(this);
  }

  cityOptions() {
    let cities = !this.props.isLoading ? this.props.cities : [];
    return cities.map((city) => {
      return {'label':city.displayName, 'value':city._id};
    });
  }

  locationOptions() {
    const cityId = this.state.changes.cityId || '';
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
            state={this.state.changes}
            onChange={changes => {this.setState({changes:changes});}}
          >
          <Field fieldName='artistName'/>
          <Field id='citySelectID' fieldName='cityId' options={this.cityOptions()}/>
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
  const handler = Meteor.subscribe('cities-and-locations');
  return {
    isLoading: !handler.ready(),
    cities: CitiesCollection.find({},{fields: {displayName:1}}).fetch(),
    locations: LocationsCollection.find({}, {fields: {name:1, cityId:1}}).fetch(),
  };
}, ArtistCreateComponent)
