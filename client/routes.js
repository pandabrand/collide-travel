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
import DashboardComponent from './components/admin/dashboard.jsx';
import AdminEventContainer from './containers/admin/event.jsx';
import AddNewEventComponent from './components/admin/events/new-event.jsx';
import EditEventComponent from './components/admin/events/edit-event.jsx';

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
  action() {
    mount(AppComponent, {
      content: (<HomeContainer />),
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
  action(params) {
    mount(AppComponent, {
      content: <CityContainer {...params}/>
    });
  }
});

citySection.route('/:name/:artistName', {
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
     console.log('route: ' + route.route.name);
     if (route && route.route.name !== 'login') {
       Session.set('redirectAfterLogin', route.path);
     }
     return FlowRouter.go('login');
   }
 }
 ]
});

privateRoutes.route('/dashboard', {
  name: 'dashboard',
  action() {
    mount(AdminAppComponent, {
      content: <DashboardComponent/>,
    });
  }
});

privateRoutes.route('/events', {
    name: 'admin-events',
    action() {
      mount(AdminAppComponent, {
        content: <AdminEventContainer/>,
      });
    }
});

privateRoutes.route('/events/new', {
    name: 'admin-events-new',
    action() {
      mount(AdminAppComponent, {
        content: <AddNewEventComponent showNew={true}/>,
      });
    }
});

privateRoutes.route('/events/:id', {
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

privateRoutes.route('/logout', {
  name: 'logout',
  action() { Meteor.logout(() => FlowRouter.go(FlowRouter.path('login'))); }
});
