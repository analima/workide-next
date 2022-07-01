import axios from 'axios';

const geral_api = axios.create({
  baseURL: process.env.REACT_APP_GERAL_API,
});

export { geral_api };
