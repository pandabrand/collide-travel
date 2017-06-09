import { CitiesCollection } from '/lib/collections/cities';
import { check } from 'meteor/check';
import faker from 'faker';
import StubCollections from 'meteor/hwillson:stub-collections';

describe('city collection', function() {
  var _city;

  beforeEach(function() {
    StubCollections.stub([CitiesCollection]);
    _city = Factory.create('city');
  });

  afterEach(function() {
    StubCollections.restore();
  });

  it('has reference id for hard rock hotels', function() {
    assert.isTrue(_.has(_city, 'hardRockId'));
  });
  it('can have alternate image for hard rock hotels', function() {
    assert.isTrue(_.has(_city, 'hardRockAltImage'));
  });
});
