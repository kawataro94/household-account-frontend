import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/auth";

import { useFetchMyProfile } from './hooks';

export const LoginContext = React.createContext();
export const Provider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    useFetchMyProfile().then(() => {
      setIsLogin(true);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          console.log(user);
        } else {
          // No user is signed in.
        }
      });
    });

  }, []);

  const value = { isLogin, setIsLogin };
  console.log(value, 'value ');
  return <LoginContext.Provider value={value} >{children}</LoginContext.Provider>;
}; 