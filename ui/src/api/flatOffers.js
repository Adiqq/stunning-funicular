import { get, post, put } from 'axios/index';
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
  put: data => {
    return put(url, {
      sourceUserId: data.User.Id,
      flatId: data.FlatId,
      created: data.Created
    });
  },
  delete: data => {
    return axios.delete(url, {
      sourceUserId: data.User.Id,
      flatId: data.FlatId,
      created: data.Created
    });
  }
};
