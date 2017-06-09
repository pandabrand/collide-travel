import { Meteor } from 'meteor/meteor';
import { CitiesCollection } from '/lib/collections/cities';
import { LocationsCollection } from '/lib/collections/locations';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import StubCollections from 'meteor/hwillson:stub-collections';
import faker from 'faker';

if(Meteor.isServer) {
  describe('location.categories', function() {
    it('has a publication that will list all known categories', function(done) {
      const collector = new PublicationCollector();
      collector.collect('location.categories', collections => {
        assert.typeOf(collections.locations, 'array');
        assert(collections.locations.length > 0);
        done();
      });
    })
  });
}
