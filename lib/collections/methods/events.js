import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { EventsCollection } from '../events.js';

Meteor.methods({
  'events.insert'(event) {

    if(Roles.userIsInRole(this.userId, ['super-admin','admin','editor'],'default')) {
      EventsCollection.insert({
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

    if(Roles.userIsInRole(this.userId, ['super-admin','admin','editor'],'default')) {
      const EventsSchema = EventsCollection.findOne(eventId);

      EventsCollection.remove(eventId);
    } else {
      throw new Meteor.Error('events.remove',
        'Must have the correct permissions for removal');
    }
  },
  'events.update'(updatedEvent, id) {
    if(Roles.userIsInRole(this.userId, ['super-admin','admin','editor'],'default')) {
      EventsCollection.update({_id: id}, updatedEvent);
    } else {
      throw new Meteor.Error('events.remove',
        'Must have the correct permissions for updating');
    }
  },
});
