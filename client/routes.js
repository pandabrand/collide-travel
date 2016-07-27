import React from 'react';
import { mount } from 'react-mounter';
import { App } from './components/application/App.jsx';
import { Home } from './components/home/home.jsx';
import PrintPage  from './components/print-page/print-page.jsx';
import Events from './components/events/events.jsx';
import Event from './containers/event.jsx';

FlowRouter.route('/', {
  action() {
    mount(App, {
      content: (<Home/>),
    });
  }
});

FlowRouter.route('/in-print', {
  action() {
    mount(App, {
      content: (<PrintPage/>),
    });
  }
});

var eventSection = FlowRouter.group({
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
    console.log('params: ' + params.id);
    mount( Layout, {
      content: (<Event id={params.id}/>)
    });
  }
});
