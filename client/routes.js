import React from 'react';
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
import AddNewCityComponent from '/imports/components/admin/city/new-city.jsx';
import EditCityComponent from '/imports/components/admin/city/edit-city.jsx';

import AdminMagazineContainer from '/imports/containers/admin/magazine.jsx';
import MagazineUpdateComponent from '/imports/components/admin/magazine/magazine-update.jsx';
import MagazineCreateComponent from '/imports/components/admin/magazine/magazine-new.jsx';

import AdminArtistContainer from '/imports/containers/admin/artist.jsx';
import AddNewArtistComponent from '/imports/components/admin/artist/new-artist.jsx';
import EditArtistComponent from '/imports/components/admin/artist/edit-artist.jsx';
import EditArtistCommentsComponent from '/imports/components/admin/artist/edit-artist-comments.jsx';

import AdminLocationContainer from '/imports/containers/admin/location.jsx';
import AddNewLocationComponent from '/imports/components/admin/location/new-location.jsx';
import EditLocationComponent from '/imports/components/admin/location/edit-location.jsx';

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
    ReactLayout.render(AdminAppComponent, {
      content: <AccountUIComponent/>,
    });
  }
});

publicRoutes.route('/', {
  name: 'home',
  action(params) {
    ReactLayout.render(AppContainer, {
      content: (<HomeContainer routeName={this.name} />),
    });
  },
});

// publicRoutes.route('/contests', {
//   name: 'contests',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: (<ContestContainer/>),
//     });
//   }
// });
//
// publicRoutes.route('/trending', {
//   name: 'trending',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: (<FullTrendingContainer/>),
//     });
//   }
// });

publicRoutes.route('/about', {
  name: 'about',
  action(params) {
    ReactLayout.render(AppContainer, {
      content: (<AboutComponent/>),
    });
  }
});

publicRoutes.route('/newsletters', {
  name: 'newsletter',
  action(params) {
    ReactLayout.render(AppContainer, {
      content: (<NewsletterComponent/>),
    });
  }
});

publicRoutes.route('/terms', {
  name: 'terms',
  action(params) {
    ReactLayout.render(AppContainer, {
      content: (<TermsComponent/>),
    });
  }
});

publicRoutes.route('/search/:search', {
  name: 'search',
  action(params) {
    ReactLayout.render(AppContainer, {
      content: (<SearchContainer {...params}/>),
    });
  }
});

publicRoutes.route('/privacy', {
  name: 'privacy',
  action(params) {
    ReactLayout.render(AppContainer, {
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
    ReactLayout.render(AppContainer, {
      content: <CategoryContainer {...params}/>
    });
  }
});

categorySection.route('/:type/city/:name', {
  name: 'city-category-guide',
  action(params) {
    ReactLayout.render(AppContainer, {
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
    ReactLayout.render(AppContainer, {
      content: <CityContainer {...params}/>
    });
  }
});

// function setGeolocation(context) {
//   context.params['geolocation'] = {};
// }
//
// publicRoutes.route('/near-me', {
//   name: 'city-guide-near-me',
//   triggersEnter: [setGeolocation],
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: <CityContainer {...params}/>
//     });
//   }
// });
//
// citySection.route('/:name/:locationName', {
//   name: 'location',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: <Cityontainer {...params}/>
//     });
//   }
// });
//
citySection.route('/:name/artist/:artistName', {
  name: 'artist-guide',
  action(params) {
    ReactLayout.render(AppContainer, {
      content: <ArtistGuideContainer {...params}/>
    });
  }
});

publicRoutes.route('/city-guides', {
  name: 'city-guides',
  action() {
    ReactLayout.render(AppContainer, {
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
//     ReactLayout.render(AppContainer, {
//       content: (<EventsContainer/>),
//     });
//   }
// });
//
// eventSection.route('/:id', {
//   name:'event',
//   action(params) {
//     ReactLayout.render( AppContainer, {
//       content: (<EventContainer id={params.id}/>)
//     });
//   }
// });
//
privateRoutes = FlowRouter.group({
  prefix: '/admin',
 triggersEnter: [ function() {
   if (!Meteor.loggingIn() && !Meteor.userId()) {
     let current = FlowRouter.current();
     if (current && current.route && current.route.name !== 'login') {
       Session.set('redirectAfterLogin', current.path);
     }
     return FlowRouter.go('login');
   }
 }
 ]
});

privateRoutes.route('/logout', {
  name: 'logout',
  action() { Meteor.logout(() => FlowRouter.go(FlowRouter.path('login'))); }
});

privateRoutes.route('/dashboard', {
  name: 'dashboard',
  action() {
    ReactLayout.render(AdminAppComponent, {
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
    ReactLayout.render(AdminAppComponent, {
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
//     ReactLayout.render(AdminAppComponent, {
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
//     ReactLayout.render(AdminAppComponent, {
//       content: <EditUserComponent id={params.username}/>,
//     });
//   }
// });
//
// adminUsersRoutes.route('/new', {
//   name: 'admin-user-new',
//   action() {
//     ReactLayout.render(AdminAppComponent, {
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
//       ReactLayout.render(AdminAppComponent, {
//         content: <AdminEventContainer/>,
//       });
//     }
// });
//
// adminEventRoutes.route('/new', {
//     name: 'admin-events-new',
//     action() {
//       ReactLayout.render(AdminAppComponent, {
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
//       ReactLayout.render(AdminAppComponent, {
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
      ReactLayout.render(AdminAppComponent, {
        content: <AdminCityContainer/>,
      });
    }
});

adminCityRoutes.route('/new', {
    name: 'admin-city-new',
    action() {
      ReactLayout.render(AdminAppComponent, {
        content: <AddNewCityComponent showNew={true}/>,
      });
    }
});

adminCityRoutes.route('/:id', {
    name: 'admin-city-edit',
    subscriptions: function(params) {
      this.register('editCity', Meteor.subscribe('edit-city', params.id));
    },
    action(params) {
      ReactLayout.render(AdminAppComponent, {
        content: <EditCityComponent id={params.id}/>,
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
      ReactLayout.render(AdminAppComponent, {
        content: <AdminArtistContainer/>,
      });
    }
});

adminArtistRoutes.route('/new', {
    name: 'admin-artist-new',
    action() {
      ReactLayout.render(AdminAppComponent, {
        content: <AddNewArtistComponent showNew={true}/>,
      });
    }
});

adminArtistRoutes.route('/:id', {
    name: 'admin-artist-edit',
    subscriptions: function(params) {
      this.register('editArtist', Meteor.subscribe('artist', params.id));
      this.register('cities', Meteor.subscribe('cities'));
    },
    action(params) {
      ReactLayout.render(AdminAppComponent, {
        content: <EditArtistComponent id={params.id}/>,
      });
    }
});

adminArtistRoutes.route('/comments/:id', {
    name: 'admin-artist-comments-edit',
    subscriptions: function(params) {
      this.register('editArtistComments', Meteor.subscribe('artist-comments-edit', params.id));
    },
    action(params) {
      ReactLayout.render(AdminAppComponent, {
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
      ReactLayout.render(AdminAppComponent, {
        content: <AdminLocationContainer/>,
      });
    }
});

adminLocationRoutes.route('/new', {
    name: 'admin-location-new',
    action() {
      ReactLayout.render(AdminAppComponent, {
        content: <AddNewLocationComponent showNew={true}/>,
      });
    }
});

adminLocationRoutes.route('/:id', {
    name: 'admin-location-edit',
    subscriptions: function(params) {
      this.register('editLocation', Meteor.subscribe('location', params.id));
      this.register('cities', Meteor.subscribe('cities'));
    },
    action(params) {
      ReactLayout.render(AdminAppComponent, {
        content: <EditLocationComponent id={params.id}/>,
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
      ReactLayout.render(AdminAppComponent, {
        content: <AdminPageContainer/>,
      });
    }
});

adminPageRoutes.route('/new', {
    name: 'admin-page-new',
    action() {
      ReactLayout.render(AdminAppComponent, {
        content: <PageCreateComponent/>,
      });
    }
});

adminPageRoutes.route('/:id', {
    name: 'admin-page-edit',
    action(params) {
      ReactLayout.render(AdminAppComponent, {
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
      ReactLayout.render(AdminAppComponent, {
        content: <AdminMagazineContainer/>,
      });
    }
});

adminMagazineRoutes.route('/new', {
    name: 'admin-magazine-new',
    action() {
      ReactLayout.render(AdminAppComponent, {
        content: <MagazineCreateComponent/>,
      });
    }
});

adminMagazineRoutes.route('/:id', {
    name: 'admin-magazine-edit',
    action(params) {
      ReactLayout.render(AdminAppComponent, {
        content: <MagazineUpdateComponent id={params.id}/>,
      });
    }
});
