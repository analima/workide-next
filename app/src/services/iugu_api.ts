import axios from 'axios';

const iugu_api = axios.create({
  baseURL: process.env.IUGU_API || 'https://api.iugu.com/v1/',
});

export { iugu_api };
