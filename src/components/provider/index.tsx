import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import UserService from 'src/services/user';
import { User } from 'src/services/user/user.dto';

export const UserContext = React.createContext<{
  user?: User;
  refetchUser?: () => void;
}>({
  user: undefined,
  refetchUser: undefined,
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();

  const fetchUser = useCallback(async () => {
    try {
      const res = await UserService.me();
      console.log('USER>>>', res);
      if (res) {
        setUser(res);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const contextValues = useMemo(
    () => ({
      user,
      reFetchUser: fetchUser,
    }),
    [user, fetchUser]
  );

  return <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>;
};

export default AppProvider;
