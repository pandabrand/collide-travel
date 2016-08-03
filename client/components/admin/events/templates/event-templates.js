import { Template } from 'meteor/templating';
import { Events } from "../../../../../lib/collections/events.js";

Template.addNewEvent.helpers({
  Events() {
    return Events;
  }
});

Template.updateEvent.helpers({
  Events() {
    return Events;
  }
});

Template.updateEvent.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('edit-event', id);
  });
});

Template.updateEvent.helpers({
  event: function() {
    var id = FlowRouter.getParam('id');
    var event = Events.findOne({_id: id}) || {};
    return event;
  }
});
