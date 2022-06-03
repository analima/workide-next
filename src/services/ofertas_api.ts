import axios from 'axios';

const ofertas_api = axios.create({
  baseURL: process.env.REACT_APP_OFERTAS_API,
});

export { ofertas_api };
