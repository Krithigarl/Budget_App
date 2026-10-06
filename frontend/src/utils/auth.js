import axios from 'axios';

// Save tokens after login
export const saveTokens = (access, refresh, user) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  localStorage.setItem('user', JSON.stringify(user));
};

// Get the access token (used on every protected request)
export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

// Get logged-in user info
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!getAccessToken();
};

// Logout - clear everything
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

// Create axios instance with token interceptor
export const createApiClient = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

  // Add token to every request automatically
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      console.log('Axios Interceptor - Token found:', !!token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Authorization header added');
      } else {
        console.log('No token in localStorage');
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createApiClient();