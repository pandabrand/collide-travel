export const TrendingCollection = new Mongo.Collection('trending');

TrendingCollection.allow({
  insert: function (userId, doc) {
    return userId;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.userId === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.userId === userId;
  }
});

TrendingCollection.deny({
  update: function (userId, docs, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'userId');
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
