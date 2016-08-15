import React from 'react';
import { mount } from 'react-mounter';
import { AppComponent } from './components/application/App.jsx';
import {AdminAppComponent} from './components/application/AdminApp.jsx';
import HomeContainer from './containers/home.jsx';
import CityContainer from './containers/city.jsx';
import CategoryContainer from './containers/category.jsx';
import PrintPageComponent  from './components/print-page/print-page.jsx';
import EventsContainer from './containers/events.jsx';
import EventContainer from './containers/event.jsx';

import AccountUIComponent from './components/accounts/accountUI.jsx';

import AdminOverviewContainer from './containers/admin/overview.jsx';

import AdminUserContainer from './containers/admin/user.jsx';
import EditUserComponent from './components/admin/users/edit-user.jsx';
import AddNewUserComponent from './components/admin/users/new-user.jsx';

import AdminEventContainer from './containers/admin/event.jsx';
import AddNewEventComponent from './components/admin/events/new-event.jsx';
import EditEventComponent from './components/admin/events/edit-event.jsx';

import AdminCityContainer from './containers/admin/city.jsx';
import AddNewCityComponent from './components/admin/city/new-city.jsx';
import EditCityComponent from './components/admin/city/edit-city.jsx';

import AdminArtistContainer from './containers/admin/artist.jsx';
import AddNewArtistComponent from './components/admin/artist/new-artist.jsx';
import EditArtistComponent from './components/admin/artist/edit-artist.jsx';
import EditArtistCommentsComponent from './components/admin/artist/edit-artist-comments.jsx';

import AdminLocationContainer from './containers/admin/location.jsx';
import AddNewLocationComponent from './components/admin/location/new-location.jsx';
import EditLocationComponent from './components/admin/location/edit-location.jsx';

import AdminPageContainer from './containers/admin/page.jsx';
import AddNewPageComponent from './components/admin/page/new-page.jsx';
import EditPageComponent from './components/admin/page/edit-page.jsx';

publicRoutes = FlowRouter.group({});

publicRoutes.route('/login', {
  name: 'login',
  action() {
    mount(AdminAppComponent, {
      content: <AccountUIComponent/>,
    });
  }
});

publicRoutes.route('/', {
  name: 'home',
  action(params) {
    console.dir(this);
    mount(AppComponent, {
      content: (<HomeContainer/>),
    });
  }
});

publicRoutes.route('/category/:type', {
  action(params) {
    mount(AppComponent, {
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
    mount(AppComponent, {
      content: <CityContainer {...params}/>
    });
  }
});

citySection.route('/:name/:locationName', {
  name: 'location',
  action(params) {
    mount(AppComponent, {
      content: <CityContainer {...params}/>
    });
  }
});

citySection.route('/:name/artist/:artistName', {
  name: 'artist-guide',
  action(params) {
    mount(AppComponent, {
      content: <CityContainer {...params}/>
    });
  }
});

publicRoutes.route('/in-print', {
  action() {
    mount(AppComponent, {
      content: (<PrintPageComponent/>),
    });
  }
});

var eventSection = publicRoutes.group({
    prefix: "/events"
});

eventSection.route('/', {
  action() {
    mount(AppComponent, {
      content: (<EventsContainer/>),
    });
  }
});

eventSection.route('/:id', {
  name:'Event',
  action(params) {
    mount( AppComponent, {
      content: (<EventContainer id={params.id}/>)
    });
  }
});

privateRoutes = FlowRouter.group({
  prefix: '/admin',
 triggersEnter: [ function() {
   if (!Meteor.loggingIn() && !Meteor.userId()) {
     let route = FlowRouter.current();
     if (route && route.route.name !== 'login') {
       Session.set('redirectAfterLogin', route.path);
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
    mount(AdminAppComponent, {
      content: <AdminOverviewContainer/>,
    });
  }
});

const adminUsersRoutes = privateRoutes.group({
  prefix: '/users',
  triggersEnter: [ function() {
      if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin'],'default')) {
        return FlowRouter.go('dashboard');
      }
    }
  ],
});

adminUsersRoutes.route('/', {
  name: 'admin-users',
  action() {
    mount(AdminAppComponent, {
      content: <AdminUserContainer/>,
    });
  }
});

adminUsersRoutes.route('/edit/:username', {
  name: 'admin-edit-user',
  subscriptions: function(params) {
    this.register('editUser', Meteor.subscribe('edit-user', params.username));
  },
  action(params) {
    mount(AdminAppComponent, {
      content: <EditUserComponent id={params.username}/>,
    });
  }
});

adminUsersRoutes.route('/new', {
  name: 'admin-user-new',
  action() {
    mount(AdminAppComponent, {
      content: <AddNewUserComponent />,
    });
  }
});

const adminEventRoutes = privateRoutes.group({
  prefix: '/events',
  triggersEnter: [ function() {
      if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
        return FlowRouter.go('dashboard');
      }
    }
  ],
});

adminEventRoutes.route('/', {
    name: 'admin-events',
    action() {
      mount(AdminAppComponent, {
        content: <AdminEventContainer/>,
      });
    }
});

adminEventRoutes.route('/new', {
    name: 'admin-events-new',
    action() {
      mount(AdminAppComponent, {
        content: <AddNewEventComponent showNew={true}/>,
      });
    }
});

adminEventRoutes.route('/:id', {
    name: 'admin-events-edit',
    subscriptions: function(params) {
      this.register('editEvent', Meteor.subscribe('edit-event', params.id));
    },
    action(params) {
      mount(AdminAppComponent, {
        content: <EditEventComponent id={params.id}/>,
      });
    }
});

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
      mount(AdminAppComponent, {
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
      mount(AdminAppComponent, {
        content: <AdminArtistContainer/>,
      });
    }
});

adminArtistRoutes.route('/new', {
    name: 'admin-artist-new',
    action() {
      mount(AdminAppComponent, {
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
      mount(AdminAppComponent, {
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
      mount(AdminAppComponent, {
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
      mount(AdminAppComponent, {
        content: <AdminPageContainer/>,
      });
    }
});

adminPageRoutes.route('/new', {
    name: 'admin-page-new',
    action() {
      mount(AdminAppComponent, {
        content: <AddNewPageComponent showNew={true}/>,
      });
    }
});

adminPageRoutes.route('/:id', {
    name: 'admin-page-edit',
    subscriptions: function(params) {
      this.register('editPage', Meteor.subscribe('page', params.id));
    },
    action(params) {
      mount(AdminAppComponent, {
        content: <EditPageComponent id={params.id}/>,
      });
    }
});
