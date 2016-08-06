export const ArtistCommentsCollection = new Mongo.Collection('artist-comments');

ArtistCommentsSchema = new SimpleSchema({
  artistId: {
    type: String,
    autoform: {
      type: 'hidden',
    },
  },
  locationId: {
    type: String,
    autoform: {
      type: 'hidden',
    },
  },
  comment: {
    type: String,
    optional: true,
    max: 200,
    autoform: {
      afFieldInput: {
        type: 'summernote',
        settings: {
          height: 100,
        },
      }
    }
  },
  hideComment: {
    type: Boolean,
    optional: true,
    defaultValue: true,
  },
});

ArtistCommentsCollection.attachSchema(ArtistCommentsSchema);
