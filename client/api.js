import { ArtistsCollection } from '../lib/collections/artists.js';
import { CitiesCollection } from '../lib/collections/cities.js';

SimpleRest.configure({
  collections: ['CitiesCollection', 'ArtistsCollection']
});

// Enable cross origin requests for all endpoints
JsonRoutes.setResponseHeaders({
  "Cache-Control": "no-store",
  "Pragma": "no-cache",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
});
// "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
