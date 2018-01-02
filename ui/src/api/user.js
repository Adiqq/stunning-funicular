import { get, post, put } from 'axios/index';
import * as axios from 'axios';
import { baseUrl } from '../constants/Config';
const url = `${baseUrl}users`;
export default {
  login: token => {
    axios.defaults.headers.common['Authorization'] = token;
    return post(`${url}/login`);
  },
  register: data => {
    return post(`${url}/register`, {
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber
    });
  },
  signout: () => {
    delete axios.defaults.headers.common['Authorization'];
  },
  changePassword: data => {
    return put(`${url}/${data.userId}/password`, {
      password: data.password
    });
  },
  deleteUser: id => {
    return axios.delete(`${url}/${id}`);
  },
  getAll: () => {
    return get(url);
  }
};
