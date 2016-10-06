export const PagesCollection = new Mongo.Collection('pages');

PagesCollection.allow({
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

PagesCollection.deny({  
  update: function (userId, docs, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'userId');
  }
});

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
