import axios from 'axios';

const notificacoes_api = axios.create({
  baseURL: process.env.REACT_APP_NOTIFICACOES_API,
});

export { notificacoes_api };
