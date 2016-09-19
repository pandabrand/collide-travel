
import { Meteor } from 'meteor/meteor';
import { CitiesCollection } from '../lib/collections/cities.js';
import { ArtistsCollection } from '../lib/collections/artists.js';
import { LocationsCollection } from '../lib/collections/locations.js';

const MAP_KEY = Meteor.settings.public.GMAP_KEY;

Cloudinary.config ({
	cloud_name:Meteor.settings.public.CLOUDINARY_CLOUD_NAME,
  api_key:Meteor.settings.public.CLOUDINARY_API_KEY,
  api_secret:Meteor.settings.CLOUDINARY_API_SECRET,
});

Meteor.startup(() => {
	CitiesCollection._ensureIndex({displayName:"text",description:"text",isDefault:-1,isPromoted:-1,isFeatured:-1},{name:'cc_city_index'});
	ArtistsCollection._ensureIndex({artistName:"text",description:"text",cityName:"text",isFeatured:-1},{name:'cc_artist_index'});
	LocationsCollection._ensureIndex({name:"text",description:"text",address:"text"},{name:'cc_location_index'});
});
