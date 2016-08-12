import { Template } from 'meteor/templating';
import ExploreSchema from '../../../../lib/collections/explore.js';

Template.blazeExploreBar.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('cities');
    self.subscribe('artists');
  });
});

Template.blazeExploreBar.onRendered(function(){
  $('.city-select-explore').select2({
    placeholder: 'Explore a city',
    allowClear: true,
  });
  $('.artist-select-explore').select2({
    placeholder: 'Select an Artist',
    allowClear: true,
  });
  $('.category-select-explore').select2({
    placeholder: 'Select a category',
    allowClear: true,
  });
});

Template.blazeExploreBar.rendered = function() {
  $('.city-select-explore').on("select2:select", function (e) { var _val = JSON.parse(e.params.data.id); FlowRouter.go('/city/:name', _val); });
  $('.artist-select-explore').on("select2:select", function (e) { var _val = JSON.parse(e.params.data.id); FlowRouter.go('/city/:name/artist/:artistName', _val); });
  $('.category-select-explore').on("select2:select", function (e) { var _val = JSON.parse(e.params.data.id); FlowRouter.go('/category/:type', _val); });
};

Template.blazeExploreBar.helpers({
  ExploreSchema() {
    return ExploreSchema;
  },
});
