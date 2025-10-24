
import axios, { AxiosError } from 'axios';
import { rateLimiter } from '../utils/rateLimiter';

const MAX_RETRIES = 3;
const TIMEOUT = 5000;

export const secureApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
});

secureApi.interceptors.request.use(
  (config) => {
  
    if (!rateLimiter.canMakeRequest('api', 20, 60000)) {
      return Promise.reject(new Error('Too many requests'));
    }
    
   
    config.headers['X-Request-Time'] = Date.now().toString();
    
    return config;
  },
  (error) => Promise.reject(error)
);

secureApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config;
    
    if (!config || !config.headers) {
      return Promise.reject(error);
    }
    

    const retryCount = (config as any).__retryCount || 0;
    
    if (retryCount < MAX_RETRIES && error.response?.status && error.response.status >= 500) {
      (config as any).__retryCount = retryCount + 1;
      await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      return secureApi(config);
    }
    
    return Promise.reject(error);
  }
);