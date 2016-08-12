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

Template.blazeExploreBar.helpers({
  ExploreSchema() {
    return ExploreSchema;
  }
});
