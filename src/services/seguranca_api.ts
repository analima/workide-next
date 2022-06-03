import axios from 'axios';

const seguranca_api = axios.create({
  baseURL: process.env.REACT_APP_SEGURANCA_API,
});

export { seguranca_api };
