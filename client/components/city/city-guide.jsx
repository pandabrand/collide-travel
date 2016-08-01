import React from 'react';

export default function CityGuide({city}) {
  return (
    <div className="content-header">
      {city.cityName}
    </div>
  );
};
