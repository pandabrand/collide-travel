export const TrendingCollection = new Mongo.Collection('trending');

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
