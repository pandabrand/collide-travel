import React from 'react';
import {createMarkup, cloudinaryURL} from '/lib/utils.js';

export default PrintElementComponent = ({print}) => {
  const soldout = !print.purchase && !print.download;
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <div className="print-container">
        <div className="print-preview-image">
          <img className="img-responsive" src={cloudinaryURL(print.printPreview, 280, 390, 'fit')}/>
        </div>
        <div className="print-control caption">
          {/*<h2>{print.displayName}</h2>*/}
            <div className="purchase-download">
            {print.showPurchaseLink ? <a href={print.printPurchaseLink} target="_blank" className="btn btn-collide print-control-button buy">Buy Now</a> : ''}
            {print.showDownloadLink ? <a href={print.printDownloadLink} target="_blank" className="btn btn-collide print-control-button download">Download</a> : ''}
            {/*<a className="hover-grey" href={FlowRouter.path('city-guide', {name:print.cityName})}>Explore Now</a>*/}
            </div>
        </div>
      </div>
    </div>
  );
};
