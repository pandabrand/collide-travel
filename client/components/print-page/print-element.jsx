import React from 'react';
import {createMarkup, cloudinaryURL} from '../../lib/utils.js';

export default PrintElementComponent = ({print}) => {
  const soldout = !print.purchase && !print.download;
  return (
    <div className="row print-row print-issue">
    <div className="col-xs-12 col-sm-6 col-md-4">
        <div className="print-preview-image">
          <img src={cloudinaryURL(print.guidePreview, 280, 390)}/>
        </div>
    </div>
    <div className="col-xs-12 col-sm-6 col-md-8">
        <div className="print-control caption">
          <h2>{print.displayName}</h2>
          <p><div dangerouslySetInnerHTML={createMarkup(print.printCopy)}/></p>
          { !print.showDownloadLink && !print.showPurchaseLink ?
            <div className="soldout">
            <h3 className="soldout">Sold Out</h3>
            <p className="cta">I still want it!</p></div> :
            <div className="purchase-download">
            {print.showPurchaseLink ? <a href={print.printPurchaseLink} target="_blank" className="btn btn-collide print-control-button buy">Buy Now</a> : ''}
            {print.showDownloadLink ? <a href={print.printDownloadLink} target="_blank" className="btn btn-collide print-control-button download">Download</a> : ''}
            <a className="hover-grey" href={FlowRouter.path('city-guide', {name:print.cityName})}>Explore Now</a>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
