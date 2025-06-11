import axios from 'axios';

const API_BASE_URL = 'http://104.248.42.192:3007';

export const api = {
  // User endpoints
  createUser: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  },

  // Task endpoints
  createTask: async (userId, taskData) => {
    const response = await axios.post(`${API_BASE_URL}/users/${userId}/tasks`, taskData);
    return response.data;
  },

  getUserTasks: async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/tasks`);
    return response.data;
  }
}; 