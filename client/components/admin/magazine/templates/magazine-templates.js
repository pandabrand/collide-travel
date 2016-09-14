import { Template } from 'meteor/templating';
import { MagazinesCollection } from "../../../../../lib/collections/magazines.js";
import slug from 'slug';

Template.addNewMagazine.onRendered(function() {
  this.autorun(function() {
  });
});

Template.addNewMagazine.helpers({
  Magazines() {
    return MagazinesCollection;
  }
});

Template.addNewMagazine.events({
  // 'click': function() {
  //   displayName = document.getElementsByName('displayName')[0];
  //   magazineName = document.getElementsByName('magazineName')[0];
  //   magazineName.value = slug(displayName.value, {lower: true}, '-');
  //   console.log('magazineName: ' + magazineName.value);
  //   return true;
  // }
});

Template.updateMagazine.events({
  // 'click': function() {
  //   displayName = document.getElementsByName('displayName')[0];
  //   magazineName = document.getElementsByName('magazineName')[0];
  //   magazineName.value = slug(displayName.value, {lower: true}, '-');
  //   return true;
  // }
});

Template.updateMagazine.helpers({
  Magazines() {
    return MagazinesCollection;
  }
});

Template.updateMagazine.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('edit-magazine', id);
  });
});

Template.updateMagazine.helpers({
  magazine: function() {
    var id = FlowRouter.getParam('id');
    var magazine = MagazinesCollection.findOne({_id: id}) || {};
    return magazine;
  }
});

Template.updateMagazine.onRendered(function() {
  this.autorun(function() {
  });
});
