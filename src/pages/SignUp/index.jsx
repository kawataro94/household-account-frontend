import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import axios from 'axios';
import { Button } from 'rsuite';

import Top from '../../components/Top';
import SignUpForm from './widget/Form';

const SignUp = () => {
  const history = useHistory();
  const [formValue, setFormValue] = useState({});

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

  const createUID = () => {
    const { account, email, password } = formValue;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        createUser(account, user.uid);
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
      <div style={{ marginTop: 30, textAlign: 'right' }}><Button appearance="primary" onClick={() => createUID()}>Primary</Button></div>
    </Top >
  );
};

export default SignUp;