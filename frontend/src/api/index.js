import axios from 'axios';

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
GITHUB_API.interceptors.request.use(config => {
    // Do something before request is sent
    // console.log(config);
    return config;
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