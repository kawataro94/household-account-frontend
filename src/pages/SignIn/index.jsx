import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import Axios from 'axios';
import { Button } from 'rsuite';

import { serverUrl } from '../../../.env/resources';
import Top from '../../components/Top';
import SignInForm from './widget/SignInForm';

const httpClient = Axios.create({
  withCredentials: true
});

const SignIn = () => {
  const history = useHistory();
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const signIn = (uid) => {
    const params = {
      uid,
    };
    httpClient
      .post(`http://${serverUrl}/member/signin`, params)
      .then(() => {
        history.push('/');
      })
      .catch((e) => {
        console.log(e, 'post error');
      });
  };


  const checkUser = () => {
    const { email, password } = formValue;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        signIn(user.uid);
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
      <h2 style={{ marginBottom: 20 }}>Sign In</h2>
      <SignInForm {...formProps} />
      <div style={{ marginTop: 30, textAlign: 'right' }}>
        <Button appearance="primary" onClick={() => checkUser()}>Submit</Button>
      </div>
    </Top >
  );
};

export default SignIn;