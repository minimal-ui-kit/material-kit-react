import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import AuthService from 'src/services/auth';

const useAuth = () => {
  const [data, setData] = useState<{ userExists: boolean; user: User | null }>({
    userExists: false,
    user: null,
  });

  const checkCurrentUser = (user: User | null) => {
    if (user) {
      setData({ userExists: true, user });
    } else {
      AuthService.setToken(null);
      setData({
        userExists: false,
        user: null,
      });
    }
  };

  useEffect(() => {
    AuthService.listen(checkCurrentUser);
  }, []);

  return data;
};

export default useAuth;
