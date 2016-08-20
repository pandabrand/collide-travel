Meteor.startup(function() {
  GoogleMaps.load({
    key: Meteor.settings.public.GMAP_KEY,
    libraries: 'places'  // also accepts an array if you need more than one
  });
  $.cloudinary.config ({
  	cloud_name:Meteor.settings.public.CLOUDINARY_CLOUD_NAME
  });

  $(function(){
    $(window).scroll(function(){
      var mapComp = $('.map');
      var aTop = mapComp.height();
      // console.dir(aTop);
      if($(this).scrollTop()>=400){
        mapComp.addClass("fix-map");//.addClass("col-sm-offset-6");
      } else {
        mapComp.removeClass("fix-map");//.removeClass("col-sm-offset-6");
      }
    });
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
