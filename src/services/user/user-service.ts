import type { User } from 'src/contexts/user-context';
import axiosInstance from '../../config/axios-instance';

const BASE_URL = '/user';

export const userService = {
  getUserProfileByEmail: async (email: string): Promise<User> => {
    const response = await axiosInstance.get(`${BASE_URL}/profile/${email}`);
    return response.data;
  },

  updateUserProfile: async (data: Partial<User>): Promise<User> => {
    const response = await axiosInstance.put(`${BASE_URL}/profile`, data);
    return response.data;
  },

  updatePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await axiosInstance.put(`${BASE_URL}/password`, {
      currentPassword,
      newPassword,
    });
  },

  uploadProfilePhoto: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await axiosInstance.put(`${BASE_URL}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.avatarUrl;
  },

  updateNotifications: async (notifications: User['notifications']): Promise<void> => {
    await axiosInstance.put(`${BASE_URL}/notifications`, { notifications });
  },
};
