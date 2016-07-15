import React from 'react';
import { mount } from 'react-mounter';
import { Layout } from '../imports/ui/App.jsx';
import { Home } from '../imports/ui/home.jsx';
import PrintPage  from '../imports/ui/print-page.jsx';
import Events from '../imports/ui/events.jsx';
import Event from '../imports/ui/data/event.jsx';

FlowRouter.route('/', {
  action() {
    mount(Layout, {
      content: (<Home/>),
    });
  }
});

FlowRouter.route('/in-print', {
  action() {
    mount(Layout, {
      content: (<PrintPage/>),
    });
  }
});

var eventSection = FlowRouter.group({
    prefix: "/events"
});

eventSection.route('/', {
  action() {
    mount(Layout, {
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
