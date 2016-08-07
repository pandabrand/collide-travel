import { Template } from 'meteor/templating';

Template.addNewUser.onCreated(function() {
  var self = this;
  self.autorun(function() {
  });
});

Template.addNewUser.onRendered(function() {
});

Template.addNewUser.helpers({
});

Template.updateUser.helpers({
});

Template.updateUser.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var username = FlowRouter.getParam('username');
    self.subscribe('edit-user', username);
  });
});

Template.updateUser.onRendered(function() {
});

Template.updateUser.helpers({
  user: function() {
    var username = FlowRouter.getParam('username');
    console.log('username: ' + username);
    var user = Meteor.users.findOne({username: username}) || {};
    return user;
  }
});
