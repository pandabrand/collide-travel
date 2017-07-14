// import { Cloudinary } from 'meteor/lepozepo:cloudinary';

const createMarkup = (markup) => {
  // const imgRegex = /"\/images\//gi;
  // updateImgRef = markup.replace(imgRegex, '"http:\/\/www.culturecollide.com/images/');
  return {__html: markup};
};

const cloudinaryURL = (imgStr, w, h, crop="fill", gravity="auto", dpr) => {
  if(!imgStr) {
    return;
  }
  const imgFile = imgStr.lastIndexOf('/') === -1 ? imgStr : imgStr.substr(imgStr.lastIndexOf('/') + 1);
  let _dpr = (typeof window !== 'undefined' && !dpr) ? window.devicePixelRatio : (dpr) ? dpr : 1;
  // _dpr = (dpr) ? dpr : _dpr;
  let cloudObj = (crop === "fill" || crop === "thumb") ? {width:w, gravity: gravity, crop:crop, dpr:_dpr } : {width:w, crop:crop, dpr: _dpr};
  if(h && h > 0) {
    cloudObj.height = h;
  }
  const imgSrc = Meteor.isClient ? $.cloudinary.url(imgFile, cloudObj) : Cloudinary.url(imgFile, cloudObj);
  return imgSrc;
}
const cloudinaryURLNoTransformations = (imgId) => {
  if (imgId) {
    return Cloudinary.url(imgId);
  }
}

const getCloudinaryDetails = (imageId, cityId) => {
  if(cityId && imageId && !imageId.includes('https:')) {
    Cloudinary.v2.api.resource(imageId,
      function(error, result){
        var imageDeets = result;
        if(imageDeets) {
          let oldPublicId = imageId;
          let newPublicId = imageDeets.public_id+'.'+imageDeets.format;
          // cloudinary.v2.uploader.rename(oldPublicId, newPublicId, function(error,result) {
          //   var renamed = result;
          //   if(renamed) {
          //     console.log(result)
          //   }
          // });
        }
      });
  }
  // console.log(Cloudinary.url(imageId));
}

const removeHTMLTags = (strInputCode) => {
  return strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
}

export {createMarkup, cloudinaryURL, removeHTMLTags, getCloudinaryDetails, cloudinaryURLNoTransformations};
