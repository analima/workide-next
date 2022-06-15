import axios from 'axios';

const pagamentos_api = axios.create({
  baseURL: process.env.REACT_APP_PAGAMENTOS_API,
});

export { pagamentos_api };
