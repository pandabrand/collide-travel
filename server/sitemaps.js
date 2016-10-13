import { CitiesCollection } from '../lib/collections/cities.js';
import { ArtistsCollection } from '../lib/collections/artists.js';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';

const cities = CitiesCollection.find({});
const artists = ArtistsCollection.find({});

const cloudinaryURL = (imgStr, w, h, crop="fill", gravity="auto") => {
  if(!imgStr) {
    return;
  }
  const imgFile = imgStr.lastIndexOf('/') === -1 ? imgStr : imgStr.substr(imgStr.lastIndexOf('/') + 1);
  let cloudObj = {width:w, gravity: gravity, crop:crop};
  if(h && h > 0) {
    cloudObj.height = h;
  }
  const imgSrc = Cloudinary.url( imgFile, cloudObj);
  return imgSrc;
}

cityURLS = cities.map(function(city) {
  const image = cloudinaryURL(city.guidePreview);
  return {page:'/city/'+city.cityName, lastmod: new Date(), images: [{loc:image}]};
});

artistURLS = artists.map(function(artist) {
  const image = cloudinaryURL(artist.image);
  return {page:'/city/'+artist.cityName+/artist/+artist.artistSlug, lastmod: new Date(), images:[{loc:image}]};
});

sitemaps.add('/sitemap.xml', function() {
  return cityURLS.concat(artistURLS);
});
