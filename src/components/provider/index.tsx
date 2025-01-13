import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import UserService from 'src/services/user';
import { User } from 'src/services/user/user.dto';
import { Cache, CacheKeys } from 'src/utils';

const IS_ADMIN_MODE = !!Cache.get<boolean>(CacheKeys.AdminMode);

interface IUserContext {
  user?: User;
  isAdminMode: boolean;
  pay: () => void;
  reFetchUser: () => void;
  setIsAdmin: (val: boolean) => void;
}

export const UserContext = React.createContext<IUserContext>({
  isAdminMode: IS_ADMIN_MODE,
  user: undefined,
  pay: () => {},
  reFetchUser: () => {},
  setIsAdmin: () => {},
});

const AppProvider = ({ children, pay }: { children: ReactNode; pay: () => void }) => {
  const [user, setUser] = useState<User>();
  const { replace } = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const res = await UserService.me();
      if (res) {
        setUser(res);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const updateAdminMode = useCallback(
    async (val: boolean) => {
      replace('/');
      Cache.set(CacheKeys.AdminMode, val);
    },
    [replace]
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const contextValues: IUserContext = useMemo(
    () => ({
      user,
      isAdminMode: IS_ADMIN_MODE,
      pay,
      setIsAdmin: updateAdminMode,
      reFetchUser: fetchUser,
    }),
    [user, updateAdminMode, fetchUser, pay]
  );

  return <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>;
};

export default AppProvider;

// { user: User | undefined; isAdminMode: boolean; setAdminMode: (val: boolean) => void; reFetchUser: () => Promise<void>; }
