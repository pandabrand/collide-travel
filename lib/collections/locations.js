import {CitiesCollection} from './cities.js';

const LocationsCollection = new Mongo.Collection('locations');

SimpleSchema.extendOptions({
  materialForm: Match.Optional(Object)
});

LocationsCollection.allow({
  insert: function (userId, doc) {
    return userId;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.userId === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.userId === userId;
  }
});

LocationsCollection.deny({
  update: function (userId, docs, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'userId');
  }
});

LocationsSchema = new SimpleSchema({
  name: {
    type: String,
    max: 90,
  },
  type: {
    type: String,
    max: 20,
  },
  address: {
    type: String,
    max: 200,
    autoform: {
      afFieldInput: {
        'data-geo': 'formatted_address',
      },
    },
  },
  addressNumber: {
    type: String,
    autoform: {
      afFieldInput: {
        'data-geo' : 'street_number'
      }
    }
  },
  addressStreet: {
    type: String,
    autoform: {
      afFieldInput: {
        'data-geo': 'route',
      },
    },
  },
  cityId: {
    type: String,
    label: 'City',
    autoform: {
      afFieldInput: {
        type: 'select',
        options: function() {
          return CitiesCollection.find().map((city) => {
            return {label: city.displayName, value: city._id};
          });
        },
      },
    },
  },
  cityName: {
    type: String,
    autoValue: function() {
      if((this.isInsert || this.isUpdate) && this.field('cityId').isSet) {
        var cityId = this.field('cityId').value;
        var cName = CitiesCollection.findOne({_id:cityId},{cityName:1});
        return cName.cityName;
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
    },
  },
  description: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'summernote',
        settings: {
          height: 400,
          toolbar: [
            ['block', ['style']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['fontfamily',['fontname']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['color', ['color']],
            ['insert',['picture','link','video']],
            ['misc', ['fullscreen','codeview','undo','redo','help']]
          ],
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
  location: {
    type: Object,
    // This should probably not be optional, check this later
    optional: true,
    autoform: {
    },
  },
  'location.lat': {
    type: Number,
    decimal: true,
    autoform: {
      afFieldInput: {
        'data-geo': 'lat',
      },
    },
  },
  'location.lng': {
    type: Number,
    decimal: true,
    autoform: {
      afFieldInput: {
        'data-geo': 'lng',
      },
    },
  },
  photo: {
    type: String,
    label: 'Location Photo',
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
      }
    }
  },
  photoCredit: {
    type: String,
    label: 'Photo Credit',
    optional: true,
  },
  website: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
  },
  isFeatured: {
    type: Boolean,
    optional: true,
    defaultValue: false,
  },
});

LocationsCollection.attachSchema(LocationsSchema);

export {LocationsCollection, LocationsSchema};
