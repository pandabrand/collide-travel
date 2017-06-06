import HtmlEditor from '/imports/components/admin/custom_form/html-editor';
import ImageUpload from '/imports/components/admin/custom_form/image-upload';
import ShortText from '/imports/components/admin/custom_form/short-text';
import Text from 'simple-react-form-material-ui/lib/text'
import Toggle from 'simple-react-form-material-ui/lib/toggle'
import File from 'simple-react-form-material-ui/lib/file/index'

SimpleSchema.extendOptions({
  srf: Match.Optional(Object)
});

PagesCollection = new Mongo.Collection('pages');

PagesCollection.allow({
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

PagesCollection.deny({
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

PagesSchema = new SimpleSchema({
  title: {
    type: String,
    max: 90,
    optional: true,
    srf: {
      type: ShortText,
    }
  },
  subheader: {
    type: String,
    max: 90,
    optional: true,
    srf: {
      type: ShortText,
    }
  },
  copy: {
    type: String,
    optional: true,
    srf: {
      type: HtmlEditor,
    },
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
    srf: {
      type: ImageUpload,
    },
  },
  isHome: {
    type: Boolean,
    defaultValue: false,
    label: 'Set As Home',
    srf: {
      type: Toggle,
    },
  },
});

PagesCollection.attachSchema(PagesSchema);

export {PagesCollection};
