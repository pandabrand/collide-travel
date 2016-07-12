import React from 'react';
import { mount } from 'react-mounter';
import { Layout } from '../imports/ui/App.jsx';
import { Home } from '../imports/ui/home.jsx';

FlowRouter.route('/', {
  action() {
    mount(Layout, {
      content: (<Home/>),
    });
  }
});
