Meteor.startup(function() {
  GoogleMaps.load({
    key: Meteor.settings.public.GMAP_KEY,
    libraries: 'places'  // also accepts an array if you need more than one
  });

  $.cloudinary.config ({
  	cloud_name:Meteor.settings.public.CLOUDINARY_CLOUD_NAME
  });

  function sticky_relocate() {
      let window_top = $(window).scrollTop();
      let sticky_div = $('#sticky-anchor');
      if(sticky_div.length > 0) {
        let div_top = sticky_div.offset().top;
        if (window_top && window_top > div_top) {
            $('#sticky-ad').addClass('fix-ad');
            $('#sticky-anchor').height($('#sticky-ad').outerHeight());
        } else {
            $('#sticky-ad').removeClass('fix-ad');
            $('#sticky-anchor').height(0);
        }
      }
  }

  function toggleHandler(toggle) {
    document.querySelector('.c-hamburger').addEventListener( "click", function(e) {
      e.preventDefault();
      (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    });
  }

  $(function() {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
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
