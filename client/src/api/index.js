import axios from 'axios';

// Create an instance of axios with a custom configuration
const API = axios.create({
  // The baseURL will be prepended to all request URLs
  baseURL: '/api', 
  // We want to send cookies with our requests
  withCredentials: true 
});

export default API;
