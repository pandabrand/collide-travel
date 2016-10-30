import cloudinary from 'cloudinary';
import request from 'superagent';

// if (process.env.CLOUDINARY_URL) {
//   var cloudinaryURL = new URI(process.env.CLOUDINARY_URL);
// }
//
// Meteor.methods({
//   afCloudinarySign: function (params) {
//     if(Meteor.isServer) {
//       check(params, Match.Optional(Object));
//
//       params = params || {};
//       params.timestamp = (new Date).getTime();
//
//       return cloudinary.utils.sign_request(params, {
//         api_key: apiKey(),
//         api_secret: apiSecret()
//       });
//     }
//   },
//   publicCredentials: function() {
//     if (cloudinaryURL) {
//       return {
//         cloudName: apiHost(),
//         apiKey: apiKey()
//       }
//     }
//   }
// });
//
// apiHost = function() {
//   if (cloudinaryURL) {
//     return cloudinaryURL.hostname();
//   }
// };
//
// apiKey = function () {
//   if (cloudinaryURL) {
//     return cloudinaryURL.username();
//   }
//
//   if (! Meteor.settings ||
//       ! Meteor.settings.public ||
//       ! Meteor.settings.public.CLOUDINARY_API_KEY) {
//     throw new Error('Meteor.settings.public.CLOUDINARY_API_KEY is undefined');
//   }
//
//   return Meteor.settings.public.CLOUDINARY_API_KEY;
// };
//
// apiSecret = function () {
//   if (cloudinaryURL) {
//     return cloudinaryURL.password();
//   }
//
//   if (! Meteor.settings ||
//       ! Meteor.settings.CLOUDINARY_API_SECRET) {
//     throw new Error('Meteor.settings.CLOUDINARY_API_SECRET is undefined');
//   }
//
//   return Meteor.settings.CLOUDINARY_API_SECRET;
// };

Meteor.methods({
  'cloudinary.upload': function(file) {
    check(file, Object);
    this.unblock();
    cloudinary.uploader.upload(file, function(result) {
        console.dir(result)
      },
      {upload_preset:Meteor.settings.CLOUDINARY_UPLOAD_PRESET}
    );
    // let formData = new FormData();
    // formData.append('upload_preset', Meteor.settings.CLOUDINARY_UPLOAD_PRESET);
    // formData.append('api_key', CLOUDINARY_API_KEY);
    // formData.append('timestamp', Date.now() / 1000 | 0);
    // formData.append('file', file);
    // console.dir(formData);
    // let convertAsyncToSync = Meteor.wrapAsync(HTTP.post),
    // resultofAsync = convertAsyncToSync('https://api.cloudinary.com/v1_1/' + Meteor.settings.public.CLOUDINARY_CLOUD_NAME +'/image/upload',
    // {data: {'upload_preset':Meteor.settings.CLOUDINARY_UPLOAD_PRESET, 'file':file.preview.blob}});
    //
    // console.dir(resultofAsync);
    //
    // let upload = request.post('https://api.cloudinary.com/v1_1/' + Meteor.settings.public.CLOUDINARY_CLOUD_NAME +'/image/upload');
    // // .accept('application/json');
    //   // .field('file', file)
    //   // .field('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    //
    // upload.send(formData);
    //
    // upload.end((err, response) => {
    //   if(err) {
    //     console.log('Method Error');
    //     console.dir(err);
    //   }
    //
    //   console.dir(response);
    //   if(response.body.secure_url !== '') {
    //     return response;
    //   }
    // });
  },
});
