import { Template } from 'meteor/templating';
import { PagesCollection } from "../../../../../lib/collections/pages.js";
import slug from 'slug';

Template.addNewPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('pages');
  });
});

Template.addNewPage.onRendered(function() {
});

Template.addNewPage.helpers({
  PagesCollection() {
    return PagesCollection;
  },
});

Template.updatePage.helpers({
  PagesCollection() {
    return PagesCollection;
  }
});

Template.updatePage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('page', id);
  });
});

Template.updatePage.onRendered(function() {
});

Template.updatePage.helpers({
  editpage: function() {
    var id = FlowRouter.getParam('id');
    var editpage = PagesCollection.findOne({_id: id}) || {};
    return editpage;
  }
});
