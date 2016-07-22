import { Meteor } from 'meteor/meteor';
const MAP_KEY = Meteor.settings.public.GMAP_KEY;

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  getCoordsByCityGeolocation: function(city) {
    var geo = new GeoCoder({ httpAdapter: "https", apiKey: MAP_KEY });
    // var geo = new GeoCoder();
    var result = geo.geocode(city);
    return result;
  }
});
