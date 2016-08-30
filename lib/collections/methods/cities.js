import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { CitiesCollection } from '../cities.js';

Meteor.methods({
  'cities.insert'(city) {
    CitiesCollection.simpleSchema().clean(city,{
      extendAutoValueContext: {
        isInsert: true,
        isUpdate: false,
        isUpsert: false,
        isFromTrustedCode: false,
      }
    });

    check(city, {
      displayName: String,
      cityName: String,
      state: String,
      description: String,
      location: Object,
      guidePreview: String,
      isDefault: Boolean,
      isPromoted: Boolean,
      printPreview: Match.Maybe(String),
      cityGuideAdSpaceImage: Match.Maybe(String),
      showAdSpaceImage: Boolean,
      printCopy: Match.Maybe(String),
      isFeatured: Boolean,
      printDownloadLink: Match.Maybe(String),
      showDownloadLink: Boolean,
      printPurchaseLink: Match.Maybe(String),
      showPurchaseLink: Boolean,
      showPrintGuide: Boolean,
    });

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
      CitiesCollection.insert({
          displayName: city.displayName,
          cityName: city.cityName,
          state: city.state,
          description: city.description,
          location: city.location,
          guidePreview: city.guidePreview,
          isDefault: city.isDefault,
          isPromoted: city.isPromoted,
          printPreview: city.printPreview,
          cityGuideAdSpaceImage: city.cityGuideAdSpaceImage,
          showAdSpaceImage: city.showAdSpaceImage,
          printCopy: city.printCopy,
          isFeatured: city.isFeatured,
          printDownloadLink: city.printDownloadLink,
          showDownloadLink: city.showDownloadLink,
          printPurchaseLink: city.printPurchaseLink,
          showPurchaseLink: city.showPurchaseLink,
          showPrintGuide: city.showPrintGuide,
      });
    } else {
      throw new Meteor.Error('cities.insert',
        'Must have the correct permissions for insertion');
    }

  },
  'cities.remove'(cityId) {
    check(cityId, String);

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
      const city = CitiesCollection.findOne(cityId);

      CitiesCollection.remove(city);
    } else {
      throw new Meteor.Error('cities.remove',
        'Must have the correct permissions for removal');
    }
  },
  'cities.update'(updatedCity, id) {
    CitiesCollection.simpleSchema().clean(updatedCity,{
      extendAutoValueContext: {
        isInsert: false,
        isUpdate: true,
        isUpsert: false,
        isFromTrustedCode: false,
      }
    });

    check(id, String);
    check(updatedCity, Object);

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
      CitiesCollection.update({_id: id}, updatedCity);
    } else {
      throw new Meteor.Error('Cities.update',
        'Must have the correct permissions for updating');
    }
  },
  getCityOptions: function () {
    var cityOptions = CitiesCollection.find({},{displayName:1}).fetch().map((city) => {
      return {label: city.displayName, value: city._id};
    });
    return cityOptions;
  },
});
