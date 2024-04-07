import axios from 'axios';
import { useMemo, useState, useCallback, createContext } from 'react';

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'name', email: 'something' });
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === '1'
  );

  const fetchToken = useCallback(async (code) => {
    console.log('Fetching Token via code');
    const authorized = await axios
      .post('https://auth.atlassian.com/oauth/token', {
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        code,
        redirect_uri: 'http://localhost:3030/login',
      })
      .catch((e) => console.log(e));

    if (authorized?.data) {
      localStorage.setItem('token', authorized.data.access_token);
      localStorage.setItem('expires_in', authorized.data.expires_in);
      localStorage.setItem('scope', authorized.data.scope);
      axios.defaults.headers.common.Authorization = `Bearer ${authorized.data.access_token}`;
      return true;
    }
    console.log('Code and token expired');
    return false;
  }, []);

  const checkToken = useCallback(async () => {
    console.log('Check token');
    const userData = await axios.get('https://api.atlassian.com/me').catch((e) => console.log(e));
    if (userData?.data) {
      console.log('Token verified, returning back');
      return true;
    }
    console.log('Fetching token by code, as it expired');
    const code = localStorage.getItem('code');
    const tokenBool = await fetchToken(code);
    if (tokenBool) {
      console.log(tokenBool, 'Token Fetched');
      await checkToken();
    }
    console.log('Token verifying failed, logging out');
    // localStorage.removeItem('code');
    // localStorage.removeItem('token');
    localStorage.setItem('isAuthenticated', '0');
    setIsAuthenticated(false);
    return false;
  }, [fetchToken]);

  const fetchUser = useCallback(async () => {
    if (await checkToken()) {
      console.log('Token verified, fetching user data');
      const userData = await axios.get('https://api.atlassian.com/me');
      if (userData.data) {
        localStorage.setItem('isAuthenticated', '1');
        setIsAuthenticated(true);
        setUser(userData.data);
        return true;
      }
    }
    return false;
  }, [checkToken]);

  const updateUser = useCallback((newValue) => {
    setUser(newValue);
  }, []);
  const contextValue = useMemo(
    () => ({
      user,
      updateUser,
      fetchUser,
      fetchToken,
      setIsAuthenticated,
      isAuthenticated,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, updateUser, fetchUser, fetchToken, setIsAuthenticated, isAuthenticated]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
