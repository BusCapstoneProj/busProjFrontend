import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const register = async (data) => {
  const response = await api.post('/register', data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post('/login', data);
  return response.data;
};

export const updateEmail = async (data) => {
  const response = await api.put('/update/email', data);
  return response.data;
};

export const updatePassword = async (data) => {
  const response = await api.put('/update/password', data);
  return response.data;
};

export const validateToken = async (token) => {
  const response = await api.get(`/validate/token?token=${token}`);
  return response.data;
};

export const extractRoles = async (token) => {
  const response = await api.get(`/extract/roles?token=${token}`);
  return response.data;
};