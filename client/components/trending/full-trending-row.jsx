import React, { Component } from 'react'
import sr from '../includes/scroll-reveal.js'
import {createMarkup} from '../../lib/utils.js';

export class FullTrendingRow extends Component {
  props: Props;

  componentDidMount = () => {
    const config = {
      origin: 'right',
      duration: 1000,
      delay: 150,
      distance: '500px',
      scale: 1,
      easing: 'ease',
    }

    sr.reveal(this.refs.box1, config)
  }

  render () {
    const url = 'http://www.culturecollide.com'+this.props.article['dc:image'];
    return (
      <div className='row trending-row'>
        <div className='row' ref='box1'>
          <div className="trending-header col-md-12 col-sm-12 col-xs-12">
            <h1 className="main-title" dangerouslySetInnerHTML={createMarkup(this.props.article.title)}></h1>
          </div>
          <div className="col-md-4">
            <div className="trending-image">
              <a href={this.props.article.link} target="_blank">
                <img className="img-responsive" src={url} />
              </a>
            </div>
          </div>
          <div className="col-md-8">
            <div className="trending-body">
              <div dangerouslySetInnerHTML={createMarkup(this.props.article.description)}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FullTrendingRow
