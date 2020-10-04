import axios from 'axios';
import cookiesServices from './cookiesServices';

const axiosApiInstance = axios.create({
  baseURL: 'https://api-ret.ml/api/v0/'
});
// ABC
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  config => {
    const token = cookiesServices.getAccessToken();
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  res => res,
  err => {
    return Promise.reject(err);
  }
);

export default axiosApiInstance;
