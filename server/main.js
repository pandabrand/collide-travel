
import { Meteor } from 'meteor/meteor';
import { CitiesCollection } from '../lib/collections/cities.js';
const MAP_KEY = Meteor.settings.public.GMAP_KEY;


Meteor.startup(() => {
	Cloudinary.config ({
		cloud_name:Meteor.settings.public.CLOUDINARY_CLOUD_NAME,
	  api_key:Meteor.settings.public.CLOUDINARY_API_KEY,
	  api_secret:Meteor.settings.CLOUDINARY_API_SECRET,
	});
  // code to run on server at startup
});
