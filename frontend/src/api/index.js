import axios from 'axios';
import store from '../store';

const GITHUB_API = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'accept': 'application/vnd.github+json',
  },
});
const PROXY_API = axios.create({
  baseURL: process.env.REACT_APP_PROXY_SERVER,
});

// Add a request interceptor
GITHUB_API.interceptors.request.use(request => {
  const token = store.getState().auth.token || window.localStorage.getItem('token');
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  return request;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
GITHUB_API.interceptors.response.use(response => {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

export { GITHUB_API, PROXY_API };