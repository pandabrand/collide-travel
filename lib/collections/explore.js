import {CitiesCollection} from './cities.js';
import {ArtistsCollection} from './artists.js';
import {LocationsCollection} from './locations.js';

export default ExploreSchema = new SimpleSchema({
    cities: {
      type: String,
      optional: true,
      autoform: {
        type: 'select2',
        afFieldInput: {
          class: 'city-select-explore',
        },
        options: function() {
          return CitiesCollection.find().map(function(city) {
            return {label:city.displayName, value:'{"name":"'+city.cityName+'"}'};
          });
        }
      }
    },
    artists: {
      type: String,
      optional: true,
      autoform: {
        type: 'select2',
        afFieldInput: {
          class: 'artist-select-explore',
        },
        options: function() {
          if(Meteor.isClient) {
            var cityName = AutoForm.getFieldValue('cities');
            if(cityName) {
              var cityObj = JSON.parse(cityName);
              var artistsCol =  ArtistsCollection.find({cityName:cityObj.name},{sort:{isFeatured: -1, name: 1}}).fetch();
              return artistsCol.map(function(artist) {
                return {label:artist.artistName,value:'{"artistName":"'+artist.artistSlug+'","name":"'+artist.cityName+'"}'};
              });
            } else {
              return ArtistsCollection.find({}, {sort:{isFeatured: -1, name: 1}}).map(function(artist) {
                return {label:artist.artistName,value:'{"artistName":"'+artist.artistSlug+'","name":"'+artist.cityName+'"}'};
              });
            }
          }
        }
      }
    },
    categories: {
      type: String,
      optional: true,
      autoform: {
        type: 'select2',
        afFieldInput: {
          class: 'category-select-explore',
        },
        options: function() {
          const allLocationCategories = _.uniq(LocationsCollection.find({}, {sort: {type: 1}}).fetch(), false, function(l){return l.type});
          const locationCategories = _.pluck(allLocationCategories, 'type');
          return locationCategories.map(function(category) {
            return {label:category,value:'{"type":"'+category+'"}'};
          });
        }
      }
    }
});
