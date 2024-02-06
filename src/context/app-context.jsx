import axios from 'axios';
import { useMemo, useState, useEffect, useCallback, createContext } from 'react';

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'name', email: 'something' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const fetchToken = useCallback(async (code) => {
    const authorized = await axios
      .post('https://auth.atlassian.com/oauth/token', {
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        code,
        redirect_uri: 'http://localhost:3030/login',
      })
      .catch((e) => console.log(e));
    console.log('came to fetch Token');
    if (authorized?.data) {
      localStorage.setItem('token', authorized.data.access_token);
      localStorage.setItem('expires_in', authorized.data.expires_in);
      localStorage.setItem('scope', authorized.data.scope);
      axios.defaults.headers.common.Authorization = `Bearer ${authorized.data.access_token}`;
      return true;
    }
    console.log('returning false');
    return false;
  }, []);

  const checkToken = useCallback(async () => {
    const userData = await axios.get('https://api.atlassian.com/me').catch((e) => console.log(e));
    if (userData?.data) {
      console.log('came here');
      return true;
    }
    console.log('came here 2');
    const code = localStorage.getItem('code');
    const tokenBool = await fetchToken(code);
    if (tokenBool) {
      console.log(tokenBool, 'Token Fetched');
      await checkToken();
    }
    console.log('returning false 2');
    localStorage.removeItem('code');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    return false;
  }, [fetchToken]);

  const fetchUser = useCallback(async () => {
    if (await checkToken()) {
      console.log('coming in');
      const userData = await axios.get('https://api.atlassian.com/me');
      if (userData.data) {
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
    [user, updateUser, fetchUser, fetchToken, setIsAuthenticated, isAuthenticated]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
