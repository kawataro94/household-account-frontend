import Axios from 'axios';
import firebase from "firebase/app";
import "firebase/auth";

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
  withCredentials: true
});

function useAuthentication() {
  const setUpAuth = ({ email, password, account }) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({ user }) => ({ uid: user.uid, account }))
      .catch(({ code, message }) => {
        console.log(code, message);
      });
  };

  const createUser = ({ uid, account }) => {
    const params = {
      account,
      uid,
      balance: "100",
      password: "password",
      group_id: "1",
    };

    return httpClient
      .post(`http://${serverUrl}/member/signup`, params)
      .catch((e) => {
        console.log(e, 'signup error');
      });
  };

  const checkEmailAndPassword = ({ email, password }) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => user.uid)
      .catch(({ code, message }) => {
        console.log(code, message);
      });
  };

  const checkUid = (uid) => {
    return httpClient
      .post(`http://${serverUrl}/member/signin`, { uid })
      .catch((e) => {
        console.log(e, 'sign uid error');
      });
  };

  const checkAuth = async (formValue) => {
    const uid = await checkEmailAndPassword(formValue);
    return checkUid(uid);
  };

  const clearSession = async () => {
    await firebase.auth().signOut().catch((error) => { console.log(error); });
    return httpClient
      .post(`http://${serverUrl}/member/signout`);
  };

  return { setUpAuth, createUser, checkAuth, clearSession };
}

export default useAuthentication;