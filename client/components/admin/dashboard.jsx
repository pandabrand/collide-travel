import React from 'react';

const showActiveRoute = (path) => {
  return FlowRouter.getRouteName() === path ? 'active' : '';
}

const getDashboard = (content) => {
  return <div className="row dashboard fullheight">
          <div className="col-sm-3 col-md-2 sidebar fullheight">
            <ul className="nav nav-sidebar">
              <li><a className={showActiveRoute('dashboard')} href={FlowRouter.path('dashboard')}>Overview</a></li>
              <li><a className={showActiveRoute('admin-ads')} href={FlowRouter.path('admin-ads')}>Ads</a></li>
              <li><a className={showActiveRoute('admin-artist')} href={FlowRouter.path('admin-artist')}>Artists</a></li>
              <li><a className={showActiveRoute('admin-page')} href={FlowRouter.path('admin-page')}>Pages</a></li>
              <li><a className={showActiveRoute('admin-city')} href={FlowRouter.path('admin-city')}>City Guides</a></li>
              <li><a className={showActiveRoute('admin-magazine')} href={FlowRouter.path('admin-magazine')}>TWP Issues</a></li>
              <li><a className={showActiveRoute('admin-location')} href={FlowRouter.path('admin-location')}>Locations</a></li>
              <li><a className={showActiveRoute('admin-events')} href={FlowRouter.path('admin-events')}>Events</a></li>
              <li><a className={showActiveRoute('admin-users')} href={FlowRouter.path('admin-users')}>Users</a></li>
              <li><a href={FlowRouter.path('logout')}>Log out <i className="fa fa-sign-out"/></a></li>
            </ul>
          </div>
          <div className="col-sm-9 col-md-10 main">
            <h1 className="page-header">Dashboard</h1>
            <div className="table-display">
              {content}
            </div>
          </div>
         </div>;
}

export default DashboardComponent = ( {content} ) =>
(<div className="container-fluid fullheight">{getDashboard(content)}</div>);
