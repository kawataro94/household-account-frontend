import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import Axios from 'axios';
import { Button } from 'rsuite';

import { serverUrl } from '../../../.env/resources';
import Center from '../../components/Center';
import SignInForm from './widget/SignInForm';
import { buttonMargin, title } from './style';

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
    <Center>
      <h2 css={title}>Sign In</h2>
      <SignInForm {...formProps} />
      <div css={buttonMargin}>
        <Button appearance="primary" onClick={() => checkUser()}>Submit</Button>
      </div>
    </Center>
  );
};

export default SignIn;