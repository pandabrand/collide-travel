import { ArtistsCollection } from '../lib/collections/artists.js';
import { CitiesCollection } from '../lib/collections/cities.js';

const api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true,
  enableCors: true,
  defaultHeaders: {
    'Access-Control-Allow-Origin':'https://collide-travel.herokuapp.com/',
  },
});

api.addCollection(CitiesCollection);

// Maps to: /api/articles/:id
api.addRoute('cities/:name', {authRequired: false}, {
  get: {
    authRequired: false,
    action: function () {
    return CitiesCollection.find({name:this.urlParams.name});
    },
  }
});
