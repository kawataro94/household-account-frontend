import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Axios from 'axios';
import { Button } from 'rsuite';

import { serverUrl } from '../../../.env/resources';
import Center from '../../components/Center';
import SignUpForm from './widget/Form';
import { buttonMargin, title } from './style';

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
      .post(`http://${serverUrl}/member/signup`, params)
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
    <Center>
      <h2 css={title}>Sign Up</h2>
      <SignUpForm {...formProps} />
      <div css={buttonMargin}>
        <Button appearance="primary" onClick={() => createUID()}>Submit</Button>
      </div>
    </Center>
  );
};

export default SignUp;