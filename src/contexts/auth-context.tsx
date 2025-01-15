import type { ReactNode } from 'react';

import { jwtDecode } from 'jwt-decode';
import React, { useMemo, useState, useEffect, useContext, createContext } from 'react';

interface DecodedToken {
  sub: string;
  roles: string[];
  exp: number; // Token expiration timestamp
}

interface User {
  email: string;
  roles: string[];
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Token geçerliliğini kontrol eden yardımcı fonksiyon
  const isTokenValid = (token: string): boolean => {
    try {
      const { exp } = jwtDecode<DecodedToken>(token);
      return Date.now() < exp * 1000; // Token geçerli mi kontrol et
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  };

  // Login işlemi
  const login = (token: string) => {
    console.log('Login fonksiyonu çağrıldı', token); // Debug için log
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode<DecodedToken>(token);
    setIsAuthenticated(true);
    setUser({ email: decodedToken.sub, roles: decodedToken.roles || [] }); // sub alanını kullanıyoruz
  };

  // Logout işlemi
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token && isTokenValid(token)) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setIsAuthenticated(true);
        setUser({ email: decodedToken.sub, roles: decodedToken.roles });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false); // Yükleme tamamlandı
    };

    // İlk yüklemede token kontrolü yap
    checkToken();

    // LocalStorage değişikliklerini dinle
    const handleStorageChange = () => {
      checkToken();
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const contextValue = useMemo(
    () => ({ isAuthenticated, user, isLoading, login, logout }),
    [isAuthenticated, user, isLoading]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
