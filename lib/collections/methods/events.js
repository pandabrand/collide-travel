import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Events } from '../events.js';

Meteor.methods({
  'events.insert'(event) {

    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      Events.insert({
          title: event.title,
          description: event.description,
          eventDate: event.eventDate,
          location: event.location,
          image: event.image,
      });
    } else {
      throw new Meteor.Error('events.remove',
        'Must have the correct permissions for insertion');
    }

  },
  'events.remove'(eventId) {
    check(eventId, String);

    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      const EventsSchema = Events.findOne(eventId);

      Events.remove(eventId);
    } else {
      throw new Meteor.Error('events.remove',
        'Must have the correct permissions for removal');
    }
  },
  'events.update'(updatedEvent, id) {
    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      Events.update({_id: id}, updatedEvent);
    } else {
      throw new Meteor.Error('events.remove',
        'Must have the correct permissions for updating');
    }
  },
});
