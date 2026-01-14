// API Configuration and Utilities

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api/v1';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface LoginResponse {
  user: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    role: string;
  };
  token: string;
}

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
};

// Get user data from localStorage
export const getUserData = (): any | null => {
  const userData = localStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
};

// Set user data in localStorage
export const setUserData = (user: any): void => {
  localStorage.setItem('user_data', JSON.stringify(user));
};

// API request wrapper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Extract error message from response
      const errorMessage = data.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      (error as any).response = data;
      throw error;
    }

    return data;
  } catch (error: any) {
    // If it's already our custom error, re-throw it
    if (error.message) {
      // Only log non-404 errors to console (404s are often expected)
      if (error.status !== 404) {
        console.error('API Error:', error.message);
      }
      throw error;
    }
    // Handle network errors or other fetch errors
    console.error('API Error:', error);
    throw new Error('Network error. Please check your connection and try again.');
  }
}

// Auth API functions
export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data) {
      setAuthToken(response.data.token);
      setUserData(response.data.user);
    }

    return response.data!;
  },

  register: async (
    username: string,
    email: string,
    password: string,
    fullName: string,
    role: string = 'editor'
  ): Promise<LoginResponse> => {
    const response = await apiRequest<LoginResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, fullName, role }),
    });

    if (response.data) {
      setAuthToken(response.data.token);
      setUserData(response.data.user);
    }

    return response.data!;
  },

  me: async (): Promise<any> => {
    const response = await apiRequest('/auth/me', {
      method: 'GET',
    });
    return response.data;
  },

  logout: (): void => {
    removeAuthToken();
  },
};

// Generic API functions
export const api = {
  get: <T>(endpoint: string): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, { method: 'GET' });
  },

  post: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  patch: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: <T>(endpoint: string): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, { method: 'DELETE' });
  },
};

export default api;

