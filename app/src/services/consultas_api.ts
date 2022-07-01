import axios from 'axios';

const consultas_api = axios.create({
  baseURL: process.env.REACT_APP_CONSULTAS_API,
});


export { consultas_api };
