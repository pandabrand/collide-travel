import { CitiesCollection } from '../lib/collections/cities.js';
import { LocationsCollection } from '../lib/collections/locations.js';
import { cloudinaryURL } from '/lib/utils.js';


// Global API configuration
var ApiV1 = new Restivus({
  prettyJson: true,
  apiPath: 'api/',
  version: 'v1'
});

/**
 * @api {get} /hotels Request Hotel Information. Shows all current cities with Hotel ID.
 * @apiName GetHotels
 * @apiGroup Hotels
 *
 *
 * @apiSuccess {String} displayName  Name of the city.
 * @apiSuccess {String} hardRockId  ID of the Hard Rock Hotel Property.
 * @apiVersion 1.0.0
 */
 ApiV1.addRoute(
  'hotels',
  {authRequired: false},
  {
    get: function() {
      let hotelCities = CitiesCollection.find({hardRockId:{$exists:true}},{fields:{displayName:1,hardRockId:1},sort:{displayName:1,hardRockId:1}}).fetch();
      return hotelCities;
    }
  }
);

/**
 * @api {get} /categories Request Category Information. Shows all current categories available for all locations.
 * @apiName GetCategories
 * @apiGroup Categories
 *
 *
 * @apiSuccess {String[]} type  Name of the category.
 * @apiVersion 1.0.0
 */
ApiV1.addRoute(
  'categories',
  {authRequired: false},
  {
    get: function() {
      let distinctLocations = LocationsCollection.find({},{fields:{type:1},sort:{type:1},distinct:{type:1}}).fetch();
      let allCategories = _.uniq(_.pluck(distinctLocations,'type'));
      return allCategories;
    }
  }
);

/**
 * @api {get} /locations/:hotelId?categories=:categories&limit=:limit&skip=:skip Request Locations. Returns an array of locations based off of hotelId. Extra query params for category filter, return count, and return skip.
 * @apiParam {int} hotelId Hotel property unique ID.
 * @apiParam {String} [categories]  Optional Comma-delimited string of category types to filter by.
 * @apiParam {int} [limit]  Optional Number of Location items to return. All returned when this is value is not passed.
 * @apiParam {int} [skip]  Optional Number of Location items to skip.
 * @apiName GetLocations
 * @apiGroup Locations
 *
 *
 * @apiSuccess {Object[]} type  An array of location objects.
 * @apiVersion 1.0.0
 */
ApiV1.addRoute(
  'locations/:hotelId',
  {authRequired: false},
  {
    get: function() {
      var hotelId = this.urlParams.hotelId;
      var query = this.queryParams;
      var categories = (query.categories) ? query.categories.split(',') : [];
      var limit = Number.parseInt(query.limit);
      var skip = Number.parseInt(query.skip);
      var cities = CitiesCollection.find({hardRockId:hotelId},).fetch();
      var locationQuery = {cityId:{$in:_.pluck(cities, '_id')}};
      var modifierOptions = {sort:{name:1},fields:{cityId:0, location:0}};
      if(!_.isEmpty(categories)) {
        locationQuery['type'] = {$in:categories};
      }

      if(Number.isInteger(limit)) {
        modifierOptions['limit'] = limit;
      }

      if(Number.isInteger(skip)) {
        modifierOptions['skip'] = skip;
      }

      var locations = LocationsCollection.find(locationQuery, modifierOptions).fetch();
      _.each(locations, function(location) {
        var imageId = location.photo;
        var altImageId = location.hardRockAltImage;
        location.photo = imageId ? cloudinaryURL(imageId) : '';
        location.hardRockAltImage = altImageId ? cloudinaryURL(altImageId) : '';
      });
      return locations;
    }
  }
)
