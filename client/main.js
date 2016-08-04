AutoForm.debug();
if (Meteor.isClient) {
  const MAP_ZOOM = 16;
  Meteor.startup(function() {
    const key =  Meteor.settings.public.GMAP_KEY;
    GoogleMaps.load({key:key,libraries:'places'});
  });
}
