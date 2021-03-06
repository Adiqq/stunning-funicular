import { schema } from 'normalizr';

const user = new schema.Entity(
  'Users',
  {},
  {
    idAttribute: 'Id'
  }
);

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

export const flatOffer = new schema.Entity(
  'FlatOffers',
  {
    User: user,
    Flat: flat
  },
  { idAttribute: value => value.SourceUserId + value.FlatId + value.Created }
);

export const flatOfferList = [flatOffer];

export const userList = [user];
