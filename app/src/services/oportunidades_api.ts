import axios from 'axios';

const oportunidades_api = axios.create({
  baseURL: process.env.REACT_APP_OPORTUNIDADES_API
});

export { oportunidades_api };
