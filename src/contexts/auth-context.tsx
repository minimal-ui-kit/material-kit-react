import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

import type { User } from 'src/types';

// ----------------------------------------------------------------------

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage or API
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // Ignore parse errors
      }
    } else {
      // Demo user for development
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: '/assets/images/avatar/avatar_1.jpg',
        status: 'online',
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Replace with actual API call
    const demoUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      avatar: '/assets/images/avatar/avatar_1.jpg',
      status: 'online',
    };
    setUser(demoUser);
    localStorage.setItem('user', JSON.stringify(demoUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

