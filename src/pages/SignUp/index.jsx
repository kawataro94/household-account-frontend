import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import Axios from 'axios';
import { Button } from 'rsuite';

import Top from '../../components/Top';
import SignUpForm from './widget/Form';

const httpClient = Axios.create({
  withCredentials: true
});

const SignUp = () => {
  const history = useHistory();
  const [formValue, setFormValue] = useState({
    account: '',
    email: '',
    password: ''
  });

  const signUp = (uid) => {
    const { account } = formValue;
    const params = {
      account,
      uid,
      balance: "100",
      password: "password",
      group_id: "1",
    };
    httpClient
      .post(`http://localhost:8000/member/signup`, params)
      .then(() => {
        history.push('/');
      })
      .catch((e) => {
        console.log(e, 'post error');
      });
  };

  const createUID = () => {
    const { email, password } = formValue;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        signUp(user.uid);
      })
      .catch(({ code, message }) => {
        console.log(code, message);
      });
  };

  const formProps = {
    formValue,
    setFormValue
  };

  return (
    <Top>
      <h2 style={{ marginBottom: 20 }}>Sign Up</h2>
      <SignUpForm {...formProps} />
      <div style={{ marginTop: 30, textAlign: 'right' }}>
        <Button appearance="primary" onClick={() => createUID()}>Submit</Button>
      </div>
    </Top >
  );
};

export default SignUp;