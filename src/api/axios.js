import axios from 'axios';

const westlakeNestUrl = axios.create({
  baseURL: 'http://localhost:3000',
});

export default westlakeNestUrl;