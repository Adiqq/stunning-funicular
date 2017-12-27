import { get, post } from 'axios/index';

const url = 'http://localhost:3001/flats/';
export default {
  get: () => {
    return get(url);
  },
  post: formData => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    return post(url, formData, config);
  }
};
