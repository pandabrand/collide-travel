import { Template } from 'meteor/templating';
import { EventsCollection } from "../../../../../lib/collections/events.js";

Template.addNewEvent.helpers({
  Events() {
    return EventsCollection;
  }
});

Template.updateEvent.helpers({
  Events() {
    return EventsCollection;
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
    var event = EventsCollection.findOne({_id: id}) || {};
    return event;
  }
});
