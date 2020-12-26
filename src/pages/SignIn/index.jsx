import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import axios from 'axios';
import { Button } from 'rsuite';

import Top from '../../components/Top';
import LoginForm from './widget/LoginForm';

const Login = () => {
  const history = useHistory();

  const createUser = (account, uid) => {
    const params = {
      account: account,
      uid,
      balance: "100",
      password: "password",
      group_id: "1",
    };
    console.log(params, 'params');
    axios
      .post(`http://localhost:8000/member/members`, params)
      .then(({ data }) => {
        console.log(data);
        history.push('/');
      })
      .catch((e) => {
        console.log(e, 'post error');
      });
  };

  const createUID = (account, email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        createUser(account, user.uid);
      })
      .catch(({ code, message }) => {
        console.log(code, message);
      });
  };

  const loginUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        console.log('login');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage, 'errorCode, errorMessage');
      });
  };

  const [formValue, setFormValue] = useState();
  const formProps = {
    formValue,
    setFormValue
  };

  return (
    <Top>
      <h2 style={{ marginBottom: 20 }}>Sign In</h2>
      <LoginForm {...formProps} />
      <div style={{ marginTop: 30, textAlign: 'right' }}><Button appearance="primary">Primary</Button></div>
      <div><button onClick={() => createUID('Trank', 'test12@gmail.com', 'testTestTest')}>test</button></div>
      <div><button onClick={() => loginUser('email@gmail.com', 'b')}>login</button></div>
    </Top >
  );
};

export default Login;