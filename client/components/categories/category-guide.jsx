import React from 'react';
import pluralize from 'pluralize';

export default function CategoryGuideComponent({category}) {
  return (
    <div className="content-header row">
      <div className="col-md-8">
      <h1>{pluralize(category, 2)}</h1>
      </div>
    </div>
  );
};
