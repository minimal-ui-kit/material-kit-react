import { useContext, useEffect } from 'react';
import { UserContext } from 'src/components/provider';
import { useRouter } from 'src/routes/hooks';
import { Cache, CacheKeys } from 'src/utils';

const useAdmin = () => {
  const { setIsAdmin } = useContext(UserContext);
  const isAdminMode = Cache.get<boolean>(CacheKeys.AdminMode) ?? false;
  return {
    isAdminMode,
    setIsAdmin,
  };
};

export default useAdmin;
