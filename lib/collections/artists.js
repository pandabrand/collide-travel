export const ArtistsCollection = new Mongo.Collection('artists');
import {CitiesCollection} from './cities.js';
import {LocationsCollection} from './locations.js';

ArtistsSchema = new SimpleSchema({
  artistName: {
    type: String,
    max: 90
  },
  cityId: {
    type: String,
    label: 'City',
    // options: 'getCityOptions'
    autoform: {
      afFieldInput: {
        type: 'universe-select',
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
      if(this.field('cityId').isSet) {
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
  locationIds: {
    type: [String],
    label: 'Locations',
    autoform: {
      // afFieldInput: {
        type: 'select-multiple',
        // options: function() {
        //   if(Meteor.isClient) {
        //     console.log('yes being called');
        //     return LocationsCollection.find().map((loc) => {
        //       var locObj = {label: loc.name, value: loc._id};
        //       console.log('location: ' + JSON.stringify(locObj));
        //       return locObj;
        //     });
        //   }
        // },
      // },
    },
  },
});

ArtistsCollection.attachSchema(ArtistsSchema);
SimpleSchema.debug = true;
