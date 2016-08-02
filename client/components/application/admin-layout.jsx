import React, { Component } from 'react';
import UIHeader from './header.jsx';
import UIFooter from './footer.jsx';

export const AdminLayout = ({content}) => (
  <div>
    <UIHeader/>
    <div>{content}</div>
    <UIFooter/>
  </div>
);
