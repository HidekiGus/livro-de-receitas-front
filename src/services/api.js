import axios from 'axios';

export const backUrl = process.env.REACT_APP_BACK_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: backUrl,
});

export function getToken() {
  return localStorage.getItem('token');
}

export function getAuthConfig() {
  const token = getToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
}
