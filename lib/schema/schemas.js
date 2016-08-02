import { Artists } from '../collections/artists.js';
import { ArtistComments } from '../collections/artist-comments.js';
import { Cities } from '../collections/cities.js';
import { Events } from '../collections/events.js';
import { Locations } from '../collections/locations.js';
import { Magazines } from '../collections/magazines.js';


Events.attachSchema(new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  description: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'froala'
      }
    }
  },
  eventDate: {
    type: Date,
    label: 'Event Date',
    autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
    }
  },
  location: {
    type: String,
    max: 60
  },
  image: {
    type: String,
    autoform: {
      type: 'ufs',
      collection: 'images',
      store: 'ImageStore',
      publication: 'images',
      thumbnails: 'thumbnails'
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if(this.isInsert) {
        return new Date();
      }
    }
  }
}));
