import { Cloudinary } from 'meteor/lepozepo:cloudinary';

const createMarkup = (markup) => { return {__html: markup}; };

const cloudinaryURL = (imgStr, w, h, crop="fill") => {
  const imgFile = imgStr.substr(imgStr.lastIndexOf('/') + 1);
  const imgSrc = (crop === "fill" || crop === "thumb") ? $.cloudinary.url( imgFile, {width:w, height:h, gravity: "auto", crop:crop}) : $.cloudinary.url( imgFile, {width:w, height:h, crop:crop});
  return imgSrc;
}


export {createMarkup, cloudinaryURL};
