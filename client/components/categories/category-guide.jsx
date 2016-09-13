import React from 'react';
import pluralize from 'pluralize';

export default function CategoryGuideComponent({category}) {
  return (
    <div className="content-header row">
      <div className="col-md-8 category-header">
        <h1>{category}</h1>
      </div>
    </div>
  );
};
