import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
      'accept': 'application/vnd.github+json',
  },
});

// Add a request interceptor
API.interceptors.request.use(config => {
    // Do something before request is sent
    console.log(config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
API.interceptors.response.use(response => {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

export default API;