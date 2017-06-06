export const TrendingCollection = new Mongo.Collection('trending');

TrendingCollection.allow({
  insert: function (userId, doc) {
    return userId;
  },
  update: function (userId, doc) {
    return userId;
  },
  remove: function (userId, doc) {
    return userId;
  }
});

TrendingCollection.deny({
  insert: function (userId, doc) {
    return !userId;
  },
  update: function (userId, doc) {
    return !userId;
  },
  remove: function (userId, doc) {
    return !userId;
  }
});

TrendingSchema = new SimpleSchema({
  secondaryTitle: {
    type: String,
  },
  secondaryDescription: {
    type: String,
    optional: true,
  },
  link: {
    type: String,
  },
  guid: {
    type: String,
  },
  image: {
    type: String,
    autoValue: function() {
      return 'http://www.culturecollide.com'+this.value;
    },
  },
});

TrendingCollection.attachSchema(TrendingSchema);
