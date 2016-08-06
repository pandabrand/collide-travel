import { Meteor } from 'meteor/meteor';
import { CitiesCollection } from '../lib/collections/cities.js';
const MAP_KEY = Meteor.settings.public.GMAP_KEY;

Meteor.startup(() => {
  // code to run on server at startup
});
