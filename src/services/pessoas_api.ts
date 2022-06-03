import axios from 'axios';

const pessoas_api = axios.create({
  baseURL: process.env.REACT_APP_PESSOAS_API,
});

export { pessoas_api };
