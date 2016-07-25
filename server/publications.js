Meteor.publish('cities', function(options) {
  return Cities.find({}, options);
});
