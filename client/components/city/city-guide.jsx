import React from 'react';

export default function CityGuideComponent({city}) {
  return (
    <div className="content-header">
      {city.displayName}
    </div>
  );
};
