import Axios from 'axios';
import firebase from "firebase/app";
import "firebase/auth";

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
  withCredentials: true
});

function useAuthentication() {
  const checkUid = (uid) => {
    return httpClient
      .post(`http://${serverUrl}/member/signin`, { uid })
      .catch((e) => {
        console.log(e, 'sign uid error');
      });
  };

  const checkEmailAndPassword = ({ email, password }) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => user.uid)
      .catch(({ code, message }) => {
        console.log(code, message);
      });
  };

  const signIn = async (formValue) => {
    const uid = await checkEmailAndPassword(formValue);
    return await checkUid(uid);
  };

  return { signIn };
}

export default useAuthentication;