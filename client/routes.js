import React from 'react';
import { mount } from 'react-mounter';
import { Layout } from '../imports/ui/App.jsx';
import { Home } from '../imports/ui/home.jsx';
import PrintPage  from '../imports/ui/print-page.jsx';

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
