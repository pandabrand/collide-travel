import React, { Component, PropTypes } from 'react';

export default class Magazine extends Component {
  render() {
    const soldout = !this.props.print.purchase && !this.props.print.download;
    return (
      <div className="print-issue col-sm-6 col-md-4">
        <div className="print-preview-image thumbnail">
          <img src={this.props.print.preview}/>
        </div>
        <div className="print-control caption">
          <p>{this.props.print.featured}</p>
          { !this.props.print.purchase && !this.props.print.download ?
            <div className="soldout">
            <h3 className="soldout">Sold Out</h3>
            <p className="cta">I still want it!</p></div> :
            <div className="purchse-download">
            {this.props.print.purchase ? <button className="btn btn-primary print-control-button buy">Buy Now</button> : ''}
            {this.props.print.download ? <button className="btn btn-primary print-control-button download">Download</button> : ''}
            </div>
          }
        </div>
      </div>
    );
  }
}

Magazine.propTypes = {
  print: PropTypes.object.isRequired,
}
