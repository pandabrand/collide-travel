import React from 'react';

export default function ArtistCityGuideComponent({artist, city}) {
  return (
    <div className="row artist-row">
      <div className="col-sm-3 col-md-4 image side"><div className="side-image"><img src="http://lorempixel.com/320/320/people/2"/></div></div>
      <div className="col-sm-9 col-md-8 content main">
        <h1 className="content-header">{artist.artistName}</h1>
        <h4>{city.displayName}</h4>
        <div className="artist-copy">
          <p>Duo et mentitum referrentur, ea menandri definiebas mea. Ex cum modo purto constituto, et malis iuvaret elaboraret nec, placerat iracundia ad per. Eos tantas tibique petentium et. Per no utinam consulatu, eos eu suas viderer tamquam. Liber utroque et quo, vel autem democritum et, in pro decore accusam propriae. Tamquam menandri patrioque id nam. Dictas pericula ex sit.</p>
          <p>Vis scripta posidonium dissentiunt ne. Ut nam percipitur deterruisset, ad sea feugiat postulant repudiare. Usu ei elit pertinax, mutat soleat epicurei mel et, enim mollis ei mel. Id sed agam quando inermis, te facer offendit forensibus mei.</p>
          <p>Habeo saperet constituto vel et, sea cu tale sumo labitur. Aliquip labitur vim ex, affert invenire sapientem an sit. Ut dico ponderum postulant pri, ex integre interpretaris qui, id nam habemus blandit reprehendunt. Novum iuvaret vix at, cu perfecto splendide duo. Appellantur reprehendunt sed ea, in vel dolor malorum, sed cu postea diceret voluptatum.</p>
        </div>
      </div>
    </div>
  );
};
