import React from 'react';

const getDashboard = (content) => {
  return <div className="row dashboard">
          <div className="col-sm-3 col-md-2 sidebar">
            <ul className="nav nav-sidebar">
              <li className="active"><a href={FlowRouter.path('dashboard')}>Overview</a></li>
              <li><a href={FlowRouter.path('admin-artist')}>Artists</a></li>
              <li><a href={FlowRouter.path('admin-page')}>Pages</a></li>
              <li><a href={FlowRouter.path('admin-city')}>City Guides</a></li>
              <li><a href={FlowRouter.path('admin-location')}>Locations</a></li>
              <li><a href={FlowRouter.path('admin-events')}>Events</a></li>
              <li><a href={FlowRouter.path('admin-users')}>Users</a></li>
              <li><a href={FlowRouter.path('logout')}>Log out</a></li>
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
(<div className="container-fluid">{getDashboard(content)}</div>);
