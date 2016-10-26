import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UIHeader from '/imports/components/application/header.jsx';
import UIFooter from '/imports/components/application/footer.jsx';

export const AdminLayoutComponent = ({content}) => (
  <div className="fullheight footer-wrapper">
    <UIHeader/>
    {/*<div className="shim"></div>*/}
    <div className="fullheight">{content}</div>
    <UIFooter/>
  </div>
);
