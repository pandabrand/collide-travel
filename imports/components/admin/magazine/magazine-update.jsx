import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import { connect } from 'react-redux';
import {Form} from 'simple-react-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import DashboardComponent from '../dashboard.jsx';
import {MagazinesCollection} from '/lib/collections/magazines.js';

const propTypes = {
  magazine: React.PropTypes.object
}

class MagazineUpdateComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.showSuccessMessage = this.showSuccessMessage.bind(this);
  }


  showSuccessMessage() {
    this.setState({successMessage: 'TWP Issue updated.'})
    document.getElementById('formtop').scrollIntoView({behavior:'smooth'})
    setTimeout(() => {
      this.setState({successMessage: null})
      FlowRouter.go('admin-magazine');
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
        <h1>Edit TWP Issue</h1>
        {!this.state.successMessage ? '' :
          <MuiThemeProvider>
            <Paper style={style} zDepth={3}>{this.state.successMessage}</Paper>
          </MuiThemeProvider>
        }
        <MuiThemeProvider>
          <Form
            collection={MagazinesCollection}
            type='update'
            doc={this.props.magazine}
            ref='form'
            onSuccess={this.showSuccessMessage}
            debug={true}
          >
          </Form>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton label='Back' onTouchTap={() => FlowRouter.go('admin-magazine')}/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton primary={true} label='Update' onTouchTap={() => this.refs.form.submit()}/>
        </MuiThemeProvider>
      </div>
    </DashboardComponent>);
  }
}

MagazineUpdateComponent.propTypes = propTypes;

export default createContainer(({id}) => {
  const handler = Meteor.subscribe('edit-magazine', id)
  const isLoading = !handler.ready()
  const magazines = MagazinesCollection.find({_id:id}).fetch()
  const magazine = magazines[0]
  return {isLoading, magazine}
}, MagazineUpdateComponent)
