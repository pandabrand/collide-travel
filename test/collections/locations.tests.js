// import { CitiesCollection } from '/lib/collections/cities';
// import { LocationsCollection } from '/lib/collections/locations';
// import { check } from 'meteor/check';
// import faker from 'faker';
// import StubCollections from 'meteor/hwillson:stub-collections';
//
// describe('location collection', function() {
//   var _city, _location;
//
//   beforeEach(function() {
//     StubCollections.stub([CitiesCollection, LocationsCollection]);
//     _city = Factory.create('city');
//     _location = Factory.create('location', {cityId: _city._id});
//   });
//
//   afterEach(function() {
//     StubCollections.restore();
//   });
//
//   it('can have alternate image for hard rock hotels', function() {
//     assert.isTrue(_.has(_location, 'hardRockAltImage'));
//   });
//
//   it('has a long description', function() {
//     assert.isTrue(_.has(_location, 'longDescription'));
//   });
// });
