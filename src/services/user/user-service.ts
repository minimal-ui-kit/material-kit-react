import axiosInstance from "../../config/axios-instance";

import type { UserProfile, UpdateUserProfileRequest, UpdateUserProfileResponse } from './user-service.type';

const BASE_URL = '/user';

export const userService = {
    getUserProfile: async (): Promise<UserProfile> => {
        const response = await axiosInstance.get(`${BASE_URL}/profile`);
        return response.data;
    },
    updateUserProfile: async (data: UpdateUserProfileRequest): Promise<UpdateUserProfileResponse> => {
        const response = await axiosInstance.put(`${BASE_URL}/update-user-profile`, data);
        return response.data;
    },
};