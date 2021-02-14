import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

export const LoginContext = React.createContext();
export const Provider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  const jumpToSignIn = () => history.push('/signin');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        jumpToSignIn();
        setIsLogin(false);
        return;
      }

      setIsLogin(true);
    });
  }, []);

  const value = { isLogin, setIsLogin };

  return <LoginContext.Provider value={value} >{children}</LoginContext.Provider>;
}; 