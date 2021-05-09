import firebase from 'firebase/app';
import 'firebase/auth';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useAuthentication() {
	const setUpAuth = async ({ groupName, account, email, password }) => {
		const params = {
			name: groupName,
		};

		try {
			await httpClient.post(`${serverUrl}/member/groups`, params);
			const {
				data: { id: groupId },
			} = await httpClient.get(`${serverUrl}/member/groups/${groupName}`);

			return firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(({ user }) => ({ uid: user.uid, account, groupId }));
		} catch (e) {
			console.error('group create error:', e.message);
		}
	};

	const createUser = ({ uid, account, groupId }) => {
		const params = {
			account,
			uid,
			balance: '100',
			password: 'password',
			groupId,
		};

		return httpClient.post(`${serverUrl}/member/signup`, params).catch((e) => {
			console.log(e, 'signup error');
		});
	};

	const checkEmailAndPassword = ({ email, password }) => {
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(({ user }) => user)
			.catch(({ code, message }) => {
				console.log(code, message);
			});
	};

	const checkUid = async (user) => {
		const idToken = await user.getIdToken().then((token) => token);
		const uid = user.uid;
		return httpClient.post(`${serverUrl}/member/signin`, { idToken, uid }).catch((e) => {
			console.log(e, 'uid error');
		});
	};

	const checkAuth = async (formValue) => {
		const user = await checkEmailAndPassword(formValue);
		return checkUid(user);
	};

	const checkStorage = (signIn, signOut) => {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				signOut();
				return;
			}

			signIn(user);
		});
	};

	const clearSession = () => httpClient.post(`${serverUrl}/member/signout`);

	const clearStorage = () => firebase.auth().signOut();

	return {
		setUpAuth,
		createUser,
		checkAuth,
		checkUid,
		checkStorage,
		clearSession,
		clearStorage,
	};
}

export default useAuthentication;
