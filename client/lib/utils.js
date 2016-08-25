import { Cloudinary } from 'meteor/lepozepo:cloudinary';

const createMarkup = (markup) => { return {__html: markup}; };

const cloudinaryURL = (imgStr, w, h) => {
  const imgFile = imgStr.substr(imgStr.lastIndexOf('/') + 1);
  const imgSrc = $.cloudinary.url( imgFile, {width:w, height:h, crop:"fill"});
  return imgSrc;
}


export {createMarkup, cloudinaryURL};
