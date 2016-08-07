export const ArtistsCollection = new Mongo.Collection('artists');
import {CitiesCollection} from './cities.js';
import {LocationsCollection} from './locations.js';
import slug from 'slug';

ArtistsSchema = new SimpleSchema({
  artistName: {
    type: String,
    max: 90
  },
  artistSlug: {
    type: String,
    max: 100,
    autoValue: function() {
      if ((this.isInsert || this.isUpdate) && this.field('artistName').isSet) {
        var artSlug = slug(this.field('artistName').value, {lower: true}, '-');
        return artSlug;
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
    autoform: {
      type: 'hidden',
    },
  },
  cityId: {
    type: String,
    label: 'City',
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
      type: 'select-multiple',
    },
  },
});

ArtistsCollection.attachSchema(ArtistsSchema);
