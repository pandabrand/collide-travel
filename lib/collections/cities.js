export const CitiesCollection = new Mongo.Collection('cities');

CitiesSchema = new SimpleSchema({
  displayName: {
    type: String,
    max: 90
  },
  state: {
    type: String,
    allowedValues: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],
  },
  location: {
    type: Object({
      autoform: {
        type: 'map',
        afFieldInput:
          options({
              'location.lat': {
                type: Number,
                decimal: true
              },
              'location.lng': {
                type: Number,
                decimal: true
              }
          })
      }
    })
  },
  guidePreview: {
    type: String,
    label: 'Guide Preview',
    autoform: {
      afFieldInput: {
        type: 'cloudinary',
      }
    }
  },
  isDefault: {
    type: Boolean,
    defaultValue: false,
    label: 'Default City'
  },
  isPromoted: {
    type: Boolean,
    defaultValue: false,
    label: 'Promoted City',
  }
});

CitiesCollection.attachSchema(CitiesSchema);
