import firebase from 'firebase/app';
import 'firebase/auth';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useAuthentication() {
	const fetchGroupId = async ({ groupName }) => {
		try {
			const {
				data: { id: groupId },
			} = await httpClient.get(`${serverUrl}/member/groups/${groupName}`);

			return groupId;
		} catch (e) {
			console.error('fetch group error:', e.message);
		}
	};

	const createMember = async ({ email, password, account, groupId }) => {
		const data = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(({ user }) => ({ uid: user.uid }));

		const params = {
			account: account,
			uid: data.uid,
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
		fetchGroupId,
		createMember,
		checkAuth,
		checkUid,
		checkStorage,
		clearSession,
		clearStorage,
	};
}

export default useAuthentication;
