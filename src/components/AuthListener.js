import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthListener = () => {
  const history = useHistory();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Kullanıcı giriş yaptıysa, anasayfaya yönlendir
        history.push('/');
      } else {
        // Kullanıcı giriş yapmadıysa, login sayfasına yönlendir
        history.push('/login');
      }
    });

    // Component unmount olduğunda listener'ı temizle
    return () => unsubscribe();
  }, [auth, history]);

  return null;
};

export default AuthListener;
