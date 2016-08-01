import React from 'react';

export default function CityGuide({artist, city}) {
  return (
    <div className="content-header">
      <h1>{artist.artistName}</h1>
      {city.displayName}
    </div>
  );
};
