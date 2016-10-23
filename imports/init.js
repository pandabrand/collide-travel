import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Match} from 'meteor/check';

/**
 * This allows you to define simple-react-form options in the schemas
 */

SimpleSchema.extendOptions({
  srf: Match.Optional(Object)
});
