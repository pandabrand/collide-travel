import { ArtistsCollection } from '/lib/collections/artists';
import { CitiesCollection } from '/lib/collections/cities';
import { check } from 'meteor/check';
import faker from 'faker';
import StubCollections from 'meteor/hwillson:stub-collections';

describe('artist collection', function() {

  var _city, _artist;

  beforeEach(function() {
    StubCollections.stub([ArtistsCollection,CitiesCollection]);
    _city = Factory.create('city');
    _artist = Factory.create('artist', {cityId: _city._id});
  });

  afterEach(function() {
    StubCollections.restore();
  });

  it('it can have object that hold comments related to the location associations', function() {
    assert(Array.isArray(_artist.artistsLocationsComment), 'Artist has location comments in ArtistsCollection');
  });
  it('if there is any location comments the location matches the selected locationIds', function() {
    resultArray = _.filter(_artist.artistsLocationsComment, function(comment) {
      return _.contains(_artist.locationIds,comment.locationId);
    });
    assert(resultArray.length > 0);
  });
});
