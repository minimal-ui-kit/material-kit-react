import React, { createContext, useState, useContext } from 'react';

import axios from 'axios';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  //const temp = (localStorage.getItem("name")===null?null:localStorage.getItem("name"))
  const [name, setName] = useState('');
  const [role, setRole] = useState('none');
  const [check, setCheck] = useState(false);

  const login = async (data) => {
    await axios
      .post('https://app-admin-api.asmitaiiita.org/api/auth/login/', data)
      //   .post('https://app-admin-api.asmitaiiita.org/api/auth/login/', data)
      .then((res) => {
        console.log(res);
        //console.log(check)
        console.log(res.data.data.user.Name);
        setName(res.data.data.user.Name);
        setRole(res.data.data.user.Role);
        localStorage.setItem('token', res.data.data.user.token);
        setCheck(true);
        location.reload();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const logout = async () => {
    localStorage.removeItem('token');
    location.reload();
  };

  return (
    <AuthContext.Provider value={{ login, logout, name, role, check }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
