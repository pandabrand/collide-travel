import React from 'react';
import { mount } from 'react-mounter';
import { App } from './components/application/App.jsx';
import {AdminApp} from './components/application/AdminApp.jsx';
import HomeContainer from './containers/home.jsx';
import City from './containers/city.jsx';
import Category from './containers/category.jsx';
import PrintPage  from './components/print-page/print-page.jsx';
import Events from './components/events/events.jsx';
import Event from './containers/event.jsx';
import AccountUI from './components/accounts/accountUI.jsx';
import Dashboard from './components/admin/dashboard.jsx';

publicRoutes = FlowRouter.group({});

publicRoutes.route('/login', {
  name: 'login',
  action() {
    mount(AdminApp, {
      content: <AccountUI/>,
    });
  }
});

publicRoutes.route('/', {
  action() {
    mount(App, {
      content: (<HomeContainer />),
    });
  }
});

publicRoutes.route('/category/:type', {
  action(params) {
    mount(App, {
      content: <Category {...params}/>
    });
  }
});

const citySection = publicRoutes.group({
    prefix: "/city"
});

citySection.route('/:name', {
  action(params) {
    mount(App, {
      content: <City {...params}/>
    });
  }
});

citySection.route('/:name/:artistName', {
  action(params) {
    mount(App, {
      content: <City {...params}/>
    });
  }
});


publicRoutes.route('/in-print', {
  action() {
    mount(App, {
      content: (<PrintPage/>),
    });
  }
});

var eventSection = publicRoutes.group({
    prefix: "/events"
});

eventSection.route('/', {
  action() {
    mount(App, {
      content: (<Events/>),
    });
  }
});

eventSection.route('/:id', {
  name:'Event',
  action(params) {
    mount( Layout, {
      content: (<Event id={params.id}/>)
    });
  }
});

privateRoutes = FlowRouter.group({
 triggersEnter: [ function() {
   if (!Meteor.loggingIn() && !Meteor.userId()) {
     let route = FlowRouter.current();
     if (route.route.name !== 'login') {
       Session.set('redirectAfterLogin', route.path);
     }
     return FlowRouter.go('dashboard');
   }
 }
 ]
});

privateRoutes.route('/dashboard', {
  name: 'dashboard',
  action() {
    mount(AdminApp, {
      content: <Dashboard/>,
    });
  }
});

privateRoutes.route('/logout', {
  name: 'logout',
  action() { Meteor.logout(() => FlowRouter.go(FlowRouter.path('login'))); }
});
