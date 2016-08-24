Meteor.startup(function() {
  GoogleMaps.load({
    key: Meteor.settings.public.GMAP_KEY,
    libraries: 'places'  // also accepts an array if you need more than one
  });
  $.cloudinary.config ({
  	cloud_name:Meteor.settings.public.CLOUDINARY_CLOUD_NAME
  });

  function sticky_relocate() {
      var window_top = $(window).scrollTop();
      var div_top = $('#sticky-anchor').offset().top;
      if (window_top > div_top) {
          $('#sticky-ad').addClass('fix-ad');
          $('#sticky-anchor').height($('#sticky-ad').outerHeight());
      } else {
          $('#sticky-ad').removeClass('fix-ad');
          $('#sticky-anchor').height(0);
      }
  }

  $(function() {
      $(window).scroll(sticky_relocate);
      sticky_relocate();
  });


  // $(function(){
  //   $(window).scroll(function(){
  //     var mapComp = $('#sticky-ad');
  //     var window_top = $(window).scrollTop();
  //     var div_top = $('#sticky-ad').offset().top;
  //     if(window_top > div_top){
  //       mapComp.addClass("fix-ad");//.addClass("col-sm-offset-6");
  //     } else {
  //       mapComp.removeClass("fix-ad");//.removeClass("col-sm-offset-6");
  //     }
  //   });
  // });

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
