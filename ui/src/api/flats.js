import { get, post, put } from 'axios/index';
import * as axios from 'axios';
import { baseUrl } from '../constants/Config';

const url = `${baseUrl}flats/`;
export default {
  get: () => {
    return get(url);
  },
  post: formData => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    return post(url, formData, config);
  },
  put: formData => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    return put(url, formData, config);
  },
  delete: id => {
    return axios.delete(`${url}${id}`);
  }
};
