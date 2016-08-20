import React from 'react';
import {createMarkup} from '../../lib/utils.js';

export default PrintElementComponent = ({print}) => {
  const soldout = !print.purchase && !print.download;
  // const createMarkup = () => { return {__html: print.description}; };
  const imgFile = print.guidePreview.substr(print.guidePreview.lastIndexOf('/') + 1);
  const imgSrc = $.cloudinary.url( imgFile, {width:280, height:390, crop:"fill"});
  return (
    <div className="print-issue col-sm-6 col-md-4">
      <div className="print-preview-image">
        <img src={imgSrc}/>
      </div>
      <div className="print-control caption">
        <h2>{print.displayName} Issue</h2>
        { !print.showDownloadLink && !print.showPurchaseLink ?
          <div className="soldout">
          <h3 className="soldout">Sold Out</h3>
          <p className="cta">I still want it!</p></div> :
          <div className="purchse-download">
          {print.showPurchaseLink ? <a href={print.printPurchaseLink} target="_blank" className="btn btn-primary print-control-button buy">Buy Now</a> : ''}
          {print.showDownloadLink ? <a href={print.printDownloadLink} target="_blank" className="btn btn-primary print-control-button download">Download</a> : ''}
          </div>
        }
      </div>
    </div>
  );
};
