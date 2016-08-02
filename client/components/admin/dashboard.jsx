import React from 'react';

const getDashboard = () => {
  return <div className="row">
          <div className="col-sm-3 col-md-2 sidebar">
            <ul className="nav nav-sidebar">
              <li className="active">Overview</li>
              <li>Pages</li>
              <li>City Guides</li>
              <li>Locations</li>
              <li>Artist</li>
            </ul>
          </div>
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 className="page-header">Dashboard</h1>
          </div>
         </div>;
}

export default Dashboard = ( {} ) =>
(<div className="container-fluid">{getDashboard()}</div>);
