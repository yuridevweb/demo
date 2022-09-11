import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    setIsLoading(true);
    axios
      .post(`http://127.0.0.1:8000/api/token/`, {
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setUserToken(res.data);
        console.log('user>>>', jwt_decode(res.data.access));
      })
      .catch((e) => {
        console.log('login error', e);
      });
    setIsLoading(false);
  };

  const registerUser = (username, password, email) => {
    setIsLoading(true);
    axios
      .post(`http://127.0.0.1:8000/api/register/`, {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log("login error", e);
      });
    setIsLoading(false);
  };

  const logout = () => {
    setUserToken(null);
    setIsLoading(false);
  };

  let contextData = {
    // test: "test123",
    // user: user,
    userToken: userToken,
    login: login,
    logout: logout,
    isLoading: isLoading,
    registerUser: registerUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
