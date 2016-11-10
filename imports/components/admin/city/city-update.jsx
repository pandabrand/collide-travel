import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import { connect } from 'react-redux';
import {Form, Field} from 'simple-react-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import DashboardComponent from '../dashboard.jsx';
import {CitiesCollection} from '/lib/collections/cities.js';

const propTypes = {
  city: React.PropTypes.object
}

class CityUpdateComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.showSuccessMessage = this.showSuccessMessage.bind(this);
  }

  showSuccessMessage() {
    this.setState({successMessage: 'City updated.'})
    document.getElementById('formtop').scrollIntoView({behavior:'smooth'})
    setTimeout(() => {
      this.setState({successMessage: null})
      FlowRouter.go('admin-city');
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

    const paperStyle = {
      margin: 25,
    };

    return (<DashboardComponent>
      <div id='formtop'>
        <h1>Edit {this.props.city.displayName}</h1>
        {!this.state.successMessage ? '' :
          <MuiThemeProvider>
            <Paper style={style} zDepth={3}>{this.state.successMessage}</Paper>
          </MuiThemeProvider>
        }
        <MuiThemeProvider>
          <Form
            collection={CitiesCollection}
            type='update'
            doc={this.props.city}
            ref='form'
            onSuccess={this.showSuccessMessage}
          >
            <Field fieldName='cityGeolocation'/>
            <Field fieldName='description'/>
            <Field fieldName='guidePreview'/>
            <Field fieldName='photoCredit'/>
            <Field fieldName='isDefault'/>
            <Field fieldName='isPromoted'/>
            <Field fieldName='isFeatured'/>

            <Divider />
            <Field fieldName='cityGuideAdSpaceImage'/>
            <Field fieldName='cityGuideAdSpaceURLlink'/>
            <Field fieldName='showAdSpaceImage'/>

            <Divider />
            <Field fieldName='printPreview'/>
            <Field fieldName='printCopy'/>
            <Field fieldName='showPrintGuide'/>
            <Field fieldName='printDownloadLink'/>
            <Field fieldName='showDownloadLink'/>
            <Field fieldName='printPurchaseLink'/>
            <Field fieldName='showPurchaseLink'/>
          </Form>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <div>
            <RaisedButton label='Back' onTouchTap={() => FlowRouter.go('admin-city')}/>
            <RaisedButton primary={true} label='Update' onTouchTap={() => this.refs.form.submit()}/>
          </div>
        </MuiThemeProvider>
      </div>
    </DashboardComponent>);
  }
}

CityUpdateComponent.propTypes = propTypes;

export default createContainer(({id}) => {
  const handler = Meteor.subscribe('find-city-id', id)
  const isLoading = !handler.ready()
  const cities = CitiesCollection.find({_id:id}).fetch()
  const city = cities[0]
  return {isLoading, city}
}, CityUpdateComponent)
