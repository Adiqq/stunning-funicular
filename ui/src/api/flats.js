import { get, post } from 'axios/index';

const url = 'http://localhost:3001/flats/';
export default {
  get: () => {
    return get(url);
  },
  post: () => {}
};
