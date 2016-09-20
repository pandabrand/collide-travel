export const PagesCollection = new Mongo.Collection('pages');

PagesSchema = new SimpleSchema({
  title: {
    type: String,
    max: 90
  },
  subheader: {
    type: String,
    max: 90,
    optional: true,
  },
  copy: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'summernote',
        settings: {
          height: 400,
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
  image: {
    type: String,
    label: 'Hero Image',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
      }
    },
    optional: true,
  },
  isHome: {
    type: Boolean,
    defaultValue: false,
    label: 'Set As Home',
  },
});

PagesCollection.attachSchema(PagesSchema);
