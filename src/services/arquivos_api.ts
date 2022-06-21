import axios from 'axios';

const arquivos_api = axios.create({
  baseURL: process.env.REACT_APP_ARQUIVOS_API,
});

export { arquivos_api };
