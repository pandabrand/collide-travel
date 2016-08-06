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
    }
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
