import { get, post } from 'axios/index';
import * as axios from 'axios';
const url = 'http://localhost:3001/users';
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
  }
};