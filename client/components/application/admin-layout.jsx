import React, { Component } from 'react';
import UIHeader from './header.jsx';
import UIFooter from './footer.jsx';

export const AdminLayoutComponent = ({content}) => (
  <div className="fullheight">
    <UIHeader/>
    <div className="shim"></div>
    <div className="fullheight">{content}</div>
    <UIFooter/>
  </div>
);
