import { useContext } from 'react';

import { Cache, CacheKeys } from 'src/utils';

import { UserContext } from 'src/components/provider';

const useAdmin = () => {
  const { setIsAdmin } = useContext(UserContext);
  const isAdminMode = Cache.get<boolean>(CacheKeys.AdminMode) ?? false;
  return {
    isAdminMode,
    setIsAdmin,
  };
};

export default useAdmin;
