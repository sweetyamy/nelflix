import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3', // version 3
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
});
