export const ArtistCommentsCollection = new Mongo.Collection('artist-comments');

ArtistCommentsCollection.allow({
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

ArtistCommentsCollection.deny({
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
          toolbar: [
            ['block', ['style']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['fontfamily',['fontname']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['color', ['color']],
            ['insert',['picture','link','video']],
            ['misc', ['fullscreen','codeview','undo','redo','help']]
          ],
        },
      }
    },
    autoValue: function() {
      if(Meteor.isServer) {
        return sanitizeHtml(this.value);
      } else {
        return this.value;
      }
    },
  },
  hideComment: {
    type: Boolean,
    optional: true,
    defaultValue: true,
  },
});

ArtistCommentsCollection.attachSchema(ArtistCommentsSchema);
