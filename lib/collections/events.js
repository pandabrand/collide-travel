export const EventsCollection = new Mongo.Collection('events');

EventsSchema = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  description: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'summernote',
        settings: {
          height: 400,
        },
      }
    },
    autoValue: function() {
      if(Meteor.isServer) {
        return sanitizeHtml(this.value);
      } else {
        return this.value;
      }
    },
  },
  eventDate: {
    type: Date,
    label: 'Event Date',
  },
  location: {
    type: String,
    max: 60
  },
  image: {
    type: String,
    label: 'Image',
    autoform: {
      afFieldInput: {
        type: 'cloudinary',
      }
    }
  }
});

EventsCollection.attachSchema(EventsSchema);
