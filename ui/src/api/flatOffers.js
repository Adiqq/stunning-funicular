import { get, post } from 'axios/index';
import * as axios from 'axios';

const url = 'http://localhost:3001/flats/offers';
export default {
  get: () => {
    return get(url);
  },
  post: flatId => {
    return post(url, {
      id: flatId
    });
  },
  delete: flatId => {
    return axios.delete(url + '/' + flatId);
  }
};
