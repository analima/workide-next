import axios from 'axios';

const blog_api = axios.create({
  baseURL: process.env.REACT_APP_BLOG_API,
});

export { blog_api };
