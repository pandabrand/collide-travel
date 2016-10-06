import {SimpleRest} from 'meteor/simple:rest';

if(Meteor.isServer) {
  SimpleRest.configure({
    collections: []
  });
}
