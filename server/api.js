import { ArtistsCollection } from '../lib/collections/artists.js';
import { CitiesCollection } from '../lib/collections/cities.js';

SimpleRest.configure({
  collections: ['CitiesCollection', 'ArtistsCollection']
});
