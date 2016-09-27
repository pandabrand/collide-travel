import { Cloudinary } from 'meteor/lepozepo:cloudinary';

const createMarkup = (markup) => {
  // const imgRegex = /"\/images\//gi;
  // updateImgRef = markup.replace(imgRegex, '"http:\/\/www.culturecollide.com/images/');
  return {__html: markup};
};

const cloudinaryURL = (imgStr, w, h, crop="fill", gravity="auto") => {
  const imgFile = imgStr.lastIndexOf('/') === -1 ? imgStr : imgStr.substr(imgStr.lastIndexOf('/') + 1);
  let cloudObj = (crop === "fill" || crop === "thumb") ? {width:w, gravity: gravity, crop:crop, dpr: window.devicePixelRatio} : {width:w, crop:crop, dpr: window.devicePixelRatio};
  if(h && h > 0) {
    cloudObj.height = h;
  }
  const imgSrc = $.cloudinary.url( imgFile, cloudObj);
  return imgSrc;
}

export {createMarkup, cloudinaryURL};
