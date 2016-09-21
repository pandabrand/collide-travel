import React, { PropTypes,  Component } from 'react';
import {createMarkup} from '../../lib/utils.js';


cityResultsDisplay = (cityResults, searchTerm) => {
  for(let x = 0; x < cityResults.length; x++) {
    let highlightedHTML = highlight(searchTerm, cityResults[x].description);
    return <div><div><h4 className={regexMatches(searchTerm, cityResults[x].displayName) ? 'highlight' : ''}><a className="hover-grey" href={FlowRouter.path('city-guide',{name:cityResults[x].cityName})}>{cityResults[x].displayName}</a></h4></div><div><div dangerouslySetInnerHTML={createMarkup(highlightedHTML)}></div></div></div>;
  }
}

artistResultsDisplay = (artistResults, searchTerm) => {
  for(let x = 0; x < artistResults.length; x++) {
    let highlightedHTML = highlight(searchTerm, artistResults[x].description);
    return <div><div><h4 className={regexMatches(searchTerm, artistResults[x].artistName) ? 'highlight' : ''}><a className="hover-grey" href={FlowRouter.path('artist-guide',{name:artistResults[x].cityName,artistName:artistResults[x].artistSlug})}>{artistResults[x].artistName}</a></h4></div><div><div dangerouslySetInnerHTML={createMarkup(highlightedHTML)}></div></div></div>;
  }
}

locationResultsDisplay = (locationResults, searchTerm) => {
  for(let x = 0; x < locationResults.length; x++) {
    let highlightedHTML = highlight(searchTerm, locationResults[x].description);
    return <div><div><h4>{highlight(searchTerm, locationResults[x].name)}</h4></div><div><div dangerouslySetInnerHTML={createMarkup(highlightedHTML)}></div></div></div>
  }
}
regexMatches = (searchTerm, text) => {
  regex = new RegExp(searchTerm, 'gi');
  return text.match(regex);
}

highlight = (searchTerm, text) => {
  regex = new RegExp('('+searchTerm+')', 'gi');
  return text.replace(regex,'<span class="highlight">$1</span>');
}

export default class SearchComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {cityResults,artistResults,locationResults, search} = this.props;
    return (
      <div className="container-fluid cc-container">
        <h1>SEARCH</h1>
        <div className="row">
          <div className="col-md-12 col-sm-10">
            <div>Results for {search}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-10">
            {cityResultsDisplay(cityResults, search)}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-10">
            {artistResultsDisplay(artistResults, search)}
          </div>
        </div>
      </div>
    );
  }
}
