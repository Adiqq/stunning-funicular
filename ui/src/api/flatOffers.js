import { get, post } from 'axios/index';

const url = 'http://localhost:3001/flats/offers';
export default {
  get: () => {
    return get(url);
  },
  post: flatId => {
    return post(url, {
      id: flatId
    });
  }
};
