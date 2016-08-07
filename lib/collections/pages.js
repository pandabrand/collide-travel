export const PagesCollection = new Mongo.Collection('pages');

PagesSchema = new SimpleSchema({
  title: {
    type: String,
    max: 90
  },
  subheader: {
    type: String,
    max: 90
  },
  copy: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'summernote',
        settings: {
          height: 400,
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
  image: {
    type: String,
    label: 'Hero Image',
    autoform: {
      afFieldInput: {
        type: 'cloudinary',
      }
    }
  },
  isHome: {
    type: Boolean,
    defaultValue: false,
    label: 'Set As Home',
  },
});

PagesCollection.attachSchema(PagesSchema);
