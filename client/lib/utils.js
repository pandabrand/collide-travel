import { Cloudinary } from 'meteor/lepozepo:cloudinary';

const createMarkup = (markup) => {
  const imgRegex = /"\/images\//gi;
  updateImgRef = markup.replace(imgRegex, '"http:\/\/www.culturecollide.com/images/');
  return {__html: updateImgRef};
};

const cloudinaryURL = (imgStr, w, h, crop="fill", gravity="auto") => {
  const imgFile = imgStr.substr(imgStr.lastIndexOf('/') + 1);
  const imgSrc = (crop === "fill" || crop === "thumb") ? $.cloudinary.url( imgFile, {width:w, height:h, gravity: gravity, crop:crop, dpr: window.devicePixelRatio}) : $.cloudinary.url( imgFile, {width:w, height:h, crop:crop, dpr: window.devicePixelRatio});
  return imgSrc;
}

export {createMarkup, cloudinaryURL};
