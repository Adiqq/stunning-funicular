import { schema } from 'normalizr';

// Define a users schema
const picture = new schema.Entity(
  'Pictures',
  {},
  {
    idAttribute: 'Id'
  }
);

// Define your comments schema
export const flat = new schema.Entity(
  'Flats',
  {
    Pictures: [picture]
  },
  {
    idAttribute: 'Id'
  }
);
export const flatList = [flat];
