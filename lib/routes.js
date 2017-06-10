import React from 'react';
import { render } from 'react-dom';
import { mount } from 'react-mounter';
import { Geolocation } from 'meteor/mdg:geolocation';


import AppContainer from '/imports/containers/app.jsx';
import {AdminAppComponent} from '/imports/components/application/AdminApp.jsx';
import HomeContainer from '/imports/containers/home.jsx';
import CityContainer from '/imports/containers/city.jsx';
import ArtistGuideContainer from '/imports/containers/artist.jsx';
import CategoryContainer from '/imports/containers/category.jsx';
import MagazineContainer  from '/imports/containers/magazine.jsx';
// import EventsContainer from './containers/events.jsx';
// import EventContainer from './containers/event.jsx';
// import ContestContainer from './containers/contests.jsx';
// import FullTrendingContainer from './containers/full-trending.jsx';
import NewsletterComponent from '/imports/components/newsletter/newsletter.jsx';
import {AboutComponent} from '/imports/components/home/about.jsx';
import {TermsComponent} from '/imports/components/home/terms.jsx';
import {PrivacyComponent} from '/imports/components/home/privacy.jsx';

import AccountUIComponent from '/imports/components/accounts/accountUI.jsx';
import AdminOverviewContainer from '/imports/containers/admin/overview.jsx';

import EditAdContainer from '/imports/containers/admin/ads.js';
import AdUpdateComponent from '/imports/components/admin/ads/ad-update.jsx';

// import AdminUserContainer from './containers/admin/user.jsx';
// import EditUserComponent from './components/admin/users/edit-user.jsx';
// import AddNewUserComponent from './components/admin/users/new-user.jsx';
//
// import AdminEventContainer from './containers/admin/event.jsx';
// import AddNewEventComponent from './components/admin/events/new-event.jsx';
// import EditEventComponent from './components/admin/events/edit-event.jsx';
//
import AdminCityContainer from '/imports/containers/admin/city.jsx';
import CityCreateComponent from '/imports/components/admin/city/city-new.jsx';
import CityUpdateComponent from '/imports/components/admin/city/city-update.jsx';

import AdminMagazineContainer from '/imports/containers/admin/magazine.jsx';
import MagazineUpdateComponent from '/imports/components/admin/magazine/magazine-update.jsx';
import MagazineCreateComponent from '/imports/components/admin/magazine/magazine-new.jsx';

import AdminArtistContainer from '/imports/containers/admin/artist.jsx';
import ArtistCreateComponent from '/imports/components/admin/artist/artist-new.jsx';
import ArtistUpdateComponent from '/imports/components/admin/artist/artist-update.jsx';
import EditArtistCommentsComponent from '/imports/components/admin/artist/edit-artist-comments.jsx';

import AdminLocationContainer from '/imports/containers/admin/location.jsx';
import LocationUpdateComponent from '/imports/components/admin/location/location-update.jsx';
import LocationCreateComponent from '/imports/components/admin/location/location-new.jsx';

import AdminPageContainer from '/imports/containers/admin/page.jsx';
import PageCreateComponent from '/imports/components/admin/page/page-new.jsx';
import PageUpdateComponent from '/imports/components/admin/page/page-update.jsx';
//
// import AdZoneCollection from '../lib/collections/ad-zone.js';

publicRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: [function(context, redirect) {
  }]
});

publicRoutes.route('/login', {
  name: 'login',
  action() {
    metaTags();
    mount(AdminAppComponent, {
      content: <AccountUIComponent/>,
    });
  }
});

publicRoutes.route('/', {
  name: 'home',
  action(params) {
    metaTags();
    mount(AppContainer, {
      content: (<HomeContainer routeName={this.name} />),
    });
  },
});

// publicRoutes.route('/contests', {
//   name: 'contests',
//   action(params) {
//     mount(AppContainer, {
//       content: (<ContestContainer/>),
//     });
//   }
// });
//
// publicRoutes.route('/trending', {
//   name: 'trending',
//   action(params) {
//     mount(AppContainer, {
//       content: (<FullTrendingContainer/>),
//     });
//   }
// });

publicRoutes.route('/about', {
  name: 'about',
  action(params) {
    metaTags();
    mount(AppContainer, {
      content: (<AboutComponent/>),
    });
  }
});

publicRoutes.route('/newsletters', {
  name: 'newsletter',
  action(params) {
    metaTags();
    mount(AppContainer, {
      content: (<NewsletterComponent/>),
    });
  }
});

publicRoutes.route('/terms', {
  name: 'terms',
  action(params) {
    metaTags();
    mount(AppContainer, {
      content: (<TermsComponent/>),
    });
  }
});

publicRoutes.route('/search/:search', {
  name: 'search',
  action(params) {
    metaTags();
    mount(AppContainer, {
      content: (<SearchContainer {...params}/>),
    });
  }
});

publicRoutes.route('/privacy', {
  name: 'privacy',
  action(params) {
    metaTags();
    mount(AppContainer, {
      content: (<PrivacyComponent/>),
    });
  }
});

const categorySection = publicRoutes.group({
  prefix: "/category"
});

categorySection.route('/:type', {
  name: 'category-guide',
  action(params) {
    metaTags();
    mount(AppContainer, {
      content: <CategoryContainer {...params}/>
    });
  }
});

categorySection.route('/:type/city/:name', {
  name: 'city-category-guide',
  action(params) {
    metaTags();
    mount(AppContainer, {
      content: <CategoryContainer {...params}/>
    });
  }
});

const citySection = publicRoutes.group({
    prefix: "/city"
});

citySection.route('/:name', {
  name: 'city-guide',
  action(params) {
    metaTags();
    mount(AppContainer, {
      content: <CityContainer {...params}/>
    });
  }
});

function setGeolocation(context) {
  context.params['geolocation'] = {};
}

publicRoutes.route('/near-me', {
  name: 'city-guide-near-me',
  triggersEnter: [setGeolocation],
  action(params) {
    metaTags('Near Me');
    mount(AppContainer, {
      content: <CityContainer {...params}/>
    });
  }
});

citySection.route('/:name/:locationName', {
  name: 'location',
  action(params) {
    metaTags();
    mount(AppContainer, {
      content: <Cityontainer {...params}/>
    });
  }
});

citySection.route('/:name/artist/:artistName', {
  name: 'artist-guide',
  action(params) {
    metaTags();
    mount(AppContainer, {
      content: <ArtistGuideContainer {...params}/>
    });
  }
});

publicRoutes.route('/city-guides', {
  name: 'city-guides',
  action() {
    metaTags();
    mount(AppContainer, {
      content: (<MagazineContainer/>),
    });
  }
});

// var eventSection = publicRoutes.group({
//     prefix: "/events"
// });
//
// eventSection.route('/', {
//   name: 'events',
//   action() {
//     mount(AppContainer, {
//       content: (<EventsContainer/>),
//     });
//   }
// });
//
// eventSection.route('/:id', {
//   name:'event',
//   action(params) {
//     mount( AppContainer, {
//       content: (<EventContainer id={params.id}/>)
//     });
//   }
// });
//
privateRoutes = FlowRouter.group({
  name: 'admin',
  prefix: '/admin',
  triggersEnter: [ isUserLoggedIn ],
});

privateRoutes.route('/logout', {
  name: 'logout',
  action() { Meteor.logout(() => FlowRouter.go(FlowRouter.path('login'))); }
});

privateRoutes.route('/dashboard', {
  name: 'dashboard',
  action() {
    mount(AdminAppComponent, {
      content: <AdminOverviewContainer/>,
    });
  }
});

const adminAdRoutes = privateRoutes.group({
  prefix: '/ads',
  triggersEnter: [ function() {
    if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin'],'default')) {
      return FlowRouter.go('dashboard');
    }
  }],
});

adminAdRoutes.route('/', {
  name: 'admin-ads',
  action() {
    mount(AdminAppComponent, {
      content: <AdUpdateComponent/>,
    });
  }
});

// const adminUsersRoutes = privateRoutes.group({
//   prefix: '/users',
//   triggersEnter: [ function() {
//       if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin'],'default')) {
//         return FlowRouter.go('dashboard');
//       }
//     }
//   ],
// });
//
// adminUsersRoutes.route('/', {
//   name: 'admin-users',
//   action() {
//     mount(AdminAppComponent, {
//       content: <AdminUserContainer/>,
//     });
//   }
// });
//
// adminUsersRoutes.route('/edit/:username', {
//   name: 'admin-edit-user',
//   subscriptions: function(params) {
//     this.register('editUser', Meteor.subscribe('edit-user', params.username));
//   },
//   action(params) {
//     mount(AdminAppComponent, {
//       content: <EditUserComponent id={params.username}/>,
//     });
//   }
// });
//
// adminUsersRoutes.route('/new', {
//   name: 'admin-user-new',
//   action() {
//     mount(AdminAppComponent, {
//       content: <AddNewUserComponent />,
//     });
//   }
// });
//
// const adminEventRoutes = privateRoutes.group({
//   prefix: '/events',
//   triggersEnter: [ function() {
//       if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
//         return FlowRouter.go('dashboard');
//       }
//     }
//   ],
// });
//
// adminEventRoutes.route('/', {
//     name: 'admin-events',
//     action() {
//       mount(AdminAppComponent, {
//         content: <AdminEventContainer/>,
//       });
//     }
// });
//
// adminEventRoutes.route('/new', {
//     name: 'admin-events-new',
//     action() {
//       mount(AdminAppComponent, {
//         content: <AddNewEventComponent showNew={true}/>,
//       });
//     }
// });
//
// adminEventRoutes.route('/:id', {
//     name: 'admin-events-edit',
//     subscriptions: function(params) {
//       this.register('editEvent', Meteor.subscribe('edit-event', params.id));
//     },
//     action(params) {
//       mount(AdminAppComponent, {
//         content: <EditEventComponent id={params.id}/>,
//       });
//     }
// });
//
const adminCityRoutes = privateRoutes.group({
  prefix: '/city',
  triggersEnter: [ function() {
      if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
        return FlowRouter.go('dashboard');
      }
    }
  ],
});

adminCityRoutes.route('/', {
    name: 'admin-city',
    action() {
      mount(AdminAppComponent, {
        content: <AdminCityContainer/>,
      });
    }
});

adminCityRoutes.route('/new', {
    name: 'admin-city-new',
    action() {
      mount(AdminAppComponent, {
        content: <CityCreateComponent/>,
      });
    }
});

adminCityRoutes.route('/:id', {
    name: 'admin-city-edit',
    action(params) {
      mount(AdminAppComponent, {
        content: <CityUpdateComponent id={params.id}/>,
      });
    }
});

const adminArtistRoutes = privateRoutes.group({
  prefix: '/artist',
  triggersEnter: [ function() {
      if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor','artist-editor'],'default')) {
        return FlowRouter.go('dashboard');
      }
    }
  ],
});

adminArtistRoutes.route('/', {
    name: 'admin-artist',
    action() {
      mount(AdminAppComponent, {
        content: <AdminArtistContainer/>,
      });
    }
});

adminArtistRoutes.route('/new', {
    name: 'admin-artist-new',
    action() {
      mount(AdminAppComponent, {
        content: <ArtistCreateComponent/>,
      });
    }
});

adminArtistRoutes.route('/:id', {
    name: 'admin-artist-edit',
    action(params) {
      mount(AdminAppComponent, {
        content: <ArtistUpdateComponent id={params.id}/>,
      });
    }
});

adminArtistRoutes.route('/comments/:id', {
    name: 'admin-artist-comments-edit',
    subscriptions: function(params) {
      this.register('editArtistComments', Meteor.subscribe('artist-comments-edit', params.id));
    },
    action(params) {
      mount(AdminAppComponent, {
        content: <EditArtistCommentsComponent id={params.id}/>,
      });
    }
});

const adminLocationRoutes = privateRoutes.group({
  prefix: '/location',
  triggersEnter: [ function() {
      if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
        return FlowRouter.go('dashboard');
      }
    }
  ],
});

adminLocationRoutes.route('/', {
    name: 'admin-location',
    action() {
      mount(AdminAppComponent, {
        content: <AdminLocationContainer/>,
      });
    }
});

adminLocationRoutes.route('/new', {
    name: 'admin-location-new',
    action() {
      mount(AdminAppComponent, {
        content: <LocationCreateComponent/>,
      });
    }
});

adminLocationRoutes.route('/:id', {
    name: 'admin-location-edit',
    action(params) {
      mount(AdminAppComponent, {
        content: <LocationUpdateComponent id={params.id}/>,
      });
    }
});

const adminPageRoutes = privateRoutes.group({
  prefix: '/pages',
  triggersEnter: [ function() {
      if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
        return FlowRouter.go('dashboard');
      }
    }
  ],
});

adminPageRoutes.route('/', {
    name: 'admin-page',
    action() {
      mount(AdminAppComponent, {
        content: <AdminPageContainer/>,
      });
    }
});

adminPageRoutes.route('/new', {
    name: 'admin-page-new',
    action() {
      mount(AdminAppComponent, {
        content: <PageCreateComponent/>,
      });
    }
});

adminPageRoutes.route('/:id', {
    name: 'admin-page-edit',
    action(params) {
      mount(AdminAppComponent, {
        content: <PageUpdateComponent id={params.id}/>,
      });
    }
});

const adminMagazineRoutes = privateRoutes.group({
  prefix: '/magazine',
  triggersEnter: [ function() {
      if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
        return FlowRouter.go('dashboard');
      }
    }
  ],
});

adminMagazineRoutes.route('/', {
    name: 'admin-magazine',
    action() {
      mount(AdminAppComponent, {
        content: <AdminMagazineContainer/>,
      });
    }
});

adminMagazineRoutes.route('/new', {
    name: 'admin-magazine-new',
    action() {
      mount(AdminAppComponent, {
        content: <MagazineCreateComponent/>,
      });
    }
});

adminMagazineRoutes.route('/:id', {
    name: 'admin-magazine-edit',
    action(params) {
      mount(AdminAppComponent, {
        content: <MagazineUpdateComponent id={params.id}/>,
      });
    }
});

function isUserLoggedIn(context, redirect, stop) {
  if(Meteor.userId()) {
    route = FlowRouter.current();
  } else {
    console.log('should be going to login');
    redirect('/login');
  }
}

const metaTags = (title='Collide Travel',image) => {
  DocHead.setTitle(title);
  const charset = {charset: 'utf-8'};
  DocHead.addMeta(charset);
  const http_content = {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'};
  DocHead.addMeta(http_content);
  const viewport = {name: 'viewport', content: 'width=device-width, initial-scale=1.0'};
  DocHead.addMeta(viewport);

  const cloudinary_dpr_hint =  {'http-equiv':'Accept-CH', content:'DPR, Viewport-Width, Width'};
  DocHead.addMeta(cloudinary_dpr_hint);
  const apple_touch_icon = {rel:"apple-touch-icon", sizes:"180x180", href:"/apple-touch-icon.png"};
  const icon_32 = {rel:"icon", type:"image/png", href:"/favicon-32x32.png", sizes:"32x32"};
  const icon_16 = {rel:"icon", type:"image/png", href:"/favicon-16x16.png", sizes:"16x16"};
  const manifest_json = {rel:"manifest", href:"/manifest.json"};
  const mask_icon = {rel:"mask-icon", href:"/safari-pinned-tab.svg", color:"#5bbad5"};
  const theme_color = {name:"theme-color", content:"#ffffff"};

  DocHead.addLink(apple_touch_icon);
  DocHead.addLink(icon_32);
  DocHead.addLink(icon_16);
  DocHead.addLink(manifest_json);
  DocHead.addLink(mask_icon);
  DocHead.addMeta(theme_color);

  const fb_app_id = {property:'fb:app_id', content:Meteor.settings.public.FACEBOOK_ID};
  const fb_site_name = {property:'og:site_name', content:'Collide Travel'};
  const fb_locale = {property:'og:locale', content:'en_US'};
  DocHead.addMeta(fb_app_id);
  DocHead.addMeta(fb_site_name);
  DocHead.addMeta(fb_locale);


  const twitter_site = {name:'twitter:site', content:'@CultureCollide'};
  DocHead.addMeta(twitter_site);
  // if(Meteor.isServer) {
  //   const fragment = {name:'fragment', content:'!'};
  //   DocHead.addMeta(fragment);
  // }
}
