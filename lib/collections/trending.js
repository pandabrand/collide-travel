export const TrendingCollections = new Mongo.Collection('trending');

TrendingSchema = new SimpleSchema({
  title: {
    type: String,
  },
  link: {
    type: String,
  },
  guid: {
    type: String,
  },
  description: {
    type: String,
  },
  subject: {
    type: String,
  },
  date: {
    type: Date,
  },
  image: {
    type: String,
  },
});
