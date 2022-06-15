import axios from 'axios';

const dicas_api = axios.create({
  baseURL: 'https://api-hom.gyan.com.br/',
  // baseURL: 'http://localhost:3333',
});

export { dicas_api };
