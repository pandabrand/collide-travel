import { Template } from 'meteor/templating';
import { CitiesCollection } from "../../../../../lib/collections/cities.js";
import slug from 'slug';

Template.addNewCity.onRendered(function() {
  this.autorun(function() {
    if(GoogleMaps.loaded()) {
      $('[name="displayName"]').geocomplete({
        details: '.geo-details',
        detailsAttribute: 'data-geo',
      });
    }
  });
});

Template.addNewCity.helpers({
  Cities() {
    return CitiesCollection;
  }
});

Template.addNewCity.events({
  // 'click': function() {
  //   displayName = document.getElementsByName('displayName')[0];
  //   cityName = document.getElementsByName('cityName')[0];
  //   cityName.value = slug(displayName.value, {lower: true}, '-');
  //   console.log('cityName: ' + cityName.value);
  //   return true;
  // }
});

Template.updateCity.events({
  // 'click': function() {
  //   displayName = document.getElementsByName('displayName')[0];
  //   cityName = document.getElementsByName('cityName')[0];
  //   cityName.value = slug(displayName.value, {lower: true}, '-');
  //   return true;
  // }
});

Template.updateCity.helpers({
  Cities() {
    return CitiesCollection;
  }
});

Template.updateCity.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('edit-city', id);
  });
});

Template.updateCity.helpers({
  city: function() {
    var id = FlowRouter.getParam('id');
    var city = CitiesCollection.findOne({_id: id}) || {};
    return city;
  }
});

Template.updateCity.onRendered(function() {
  this.autorun(function() {
    if(GoogleMaps.loaded()) {
      $('[name="displayName"]').geocomplete({
        details: '.geo-details',
        detailsAttribute: 'data-geo',
      });
    }
  });
});
