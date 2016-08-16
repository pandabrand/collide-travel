Meteor.startup(function() {
  GoogleMaps.load({
    key: Meteor.settings.public.GMAP_KEY,
    libraries: 'places'  // also accepts an array if you need more than one
  });
  $.cloudinary.config ({
  	cloud_name:Meteor.settings.public.CLOUDINARY_CLOUD_NAME
  });
})

FlowRouter.wait();
Tracker.autorun(function() {
  // if the roles subscription is ready, start routing
  // there are specific cases that this reruns, so we also check
  // that FlowRouter hasn't initalized already
  if (Roles.subscription.ready() && !FlowRouter._initialized) {
     return FlowRouter.initialize();
   }
});
