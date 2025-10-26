import axios from 'axios';
import { type StoreItem } from '../types/index';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://closet-recruiting-api.azurewebsites.net',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API service functions
export const storeApi = {
  // Fetch store items with pagination (for infinite scroll)
  fetchStoreItemsPaginated: async (
    page: number = 1,
    limit: number = 20
  ): Promise<{ items: StoreItem[]; hasMore: boolean }> => {
    try {
      const response = await api.get('/api/data');
      const allItems = response.data;
      // Simulate pagination on frontend since API doesn't support it
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const items = allItems.slice(startIndex, endIndex);
      const hasMore = endIndex < allItems.length;

      return { items, hasMore };
    } catch (error) {
      console.error('Failed to fetch paginated store items:', error);
      throw error;
    }
  },
};

export default api;
