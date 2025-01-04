import axiosInstance from '../../config/axios-instance';

import type { LoginRequest, LoginResponse } from './auth-service.type';

const BASE_URL = '/auth';

export const authService = {
    // Login
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await axiosInstance.post(`${BASE_URL}/login`, data);
        return response.data;
    },

    // Logout
    logout: () => {
        localStorage.removeItem('token');
    },
};
