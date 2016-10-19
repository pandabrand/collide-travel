import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import ReactDOM from 'react-dom';



export const MapCommentComponent = ({artist, comment}) => {
  const showComment = comment && !comment.hideComment && comment.comment && comment.comment.length > 0 && comment.comment !== 'undefined';
  return showComment ? <div style={{boxShadow: '1px 1px 2px 0 '+ artist.color}} className="artist-comments">
      <div className="artist-comments-header">{artist.artistName}  says:</div>
      <div className="artist-comments-body">{comment.comment}</div></div> : <div style={{boxShadow: '1px 1px 2px 0 '+ artist.color}} className="artist-comments">
          <div className="artist-comments-header"><a className="artist-comment-link" href={FlowRouter.path('artist-guide', {name:artist.cityName, artistName:artist.artistSlug})}>{artist.artistName} Recommends</a></div>
          </div>;
}
