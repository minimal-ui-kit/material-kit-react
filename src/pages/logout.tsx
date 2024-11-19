import { useCallback, useEffect } from 'react';
import { useRouter } from 'src/routes/hooks';
import AuthService from 'src/services/auth';

function Logout() {
  const { replace } = useRouter();

  const logout = useCallback(async () => {
    await AuthService.logout();
    replace('/signin');
  }, [replace]);

  useEffect(() => {
    logout();
  }, [logout]);

  return null;
}

export default Logout;
