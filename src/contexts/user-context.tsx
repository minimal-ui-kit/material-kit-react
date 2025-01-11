import type { ReactNode } from 'react';

import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { useAuth } from './auth-context';
import { userService } from '../services/user/user-service';

export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  avatarUrl?: string;
  role: 'admin' | 'user';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  updateUser: (data: Partial<User>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateAvatar: (file: File) => Promise<void>;
  updateNotifications: (notifications: User['notifications']) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user: authUser, isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (authUser?.email) {
        const userData = await userService.getUserProfileByEmail(authUser.email);
        setUser(userData);
      }
    } catch (err) {
      setError('Kullanıcı bilgileri alınırken bir hata oluştu');
      console.error('Kullanıcı bilgileri alınamadı:', err);
    } finally {
      setIsLoading(false);
    }
  }, [authUser?.email]);

  const updateUser = useCallback(async (data: Partial<User>) => {
    try {
      setError(null);
      await userService.updateUserProfile(data);
      await fetchUser();
    } catch (err) {
      setError('Profil güncellenirken bir hata oluştu');
      throw err;
    }
  }, [fetchUser]);

  const updatePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      await userService.updatePassword(currentPassword, newPassword);
    } catch (err) {
      console.error('Failed to update password:', err);
      throw err;
    }
  }, []);

  const updateAvatar = useCallback(async (file: File) => {
    try {
      const avatarUrl = await userService.uploadProfilePhoto(file);
      setUser((prev) => (prev ? { ...prev, avatarUrl } : null));
    } catch (err) {
      console.error('Failed to update avatar:', err);
      throw err;
    }
  }, []);

  const updateNotifications = useCallback(async (notifications: User['notifications']) => {
    try {
      await userService.updateNotifications(notifications);
      setUser((prev) => (prev ? { ...prev, notifications } : null));
    } catch (err) {
      console.error('Failed to update notifications:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (isAuthenticated && authUser?.email) {
      fetchUser().catch((err) => {
        console.error('Failed to fetch user:', err);
        setIsLoading(false);
      });
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [isAuthenticated, authUser?.email, fetchUser]);

  const contextValue = useMemo(() => ({
    user,
    isLoading,
    error,
    updateUser,
    updatePassword,
    updateAvatar,
    updateNotifications,
    refreshUser: fetchUser,
  }), [user, isLoading, error, updateUser, updatePassword, updateAvatar, updateNotifications, fetchUser]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}