import { get } from 'axios/index';
import { baseUrl } from '../constants/Config';

const url = `${baseUrl}reports/`;
export default {
  get: (year, month) => {
    return get(`${url}${year}/${month}`);
  }
};
