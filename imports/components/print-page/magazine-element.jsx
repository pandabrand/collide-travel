import React from 'react';
import {createMarkup, cloudinaryURL} from '/lib/utils.js';

export default MagazineElementComponent = ({print}) => {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <div className="print-container">
        <div className="print-preview-image">
          <img className="img-responsive" src={cloudinaryURL(print.guidePreview, 280, 390, 'fit')}/>
        </div>
        <div className="print-control caption">
            <div className="purchase-download">
            {print.showPurchaseLink ? <a href={print.printPurchaseLink} target="_blank" className="btn btn-collide print-control-button buy">Buy Now</a> : ''}
            {print.showDownloadLink ? <a href={print.printDownloadLink} target="_blank" className="btn btn-collide print-control-button download">Download</a> : ''}
            </div>
        </div>
      </div>
    </div>
  );
};
