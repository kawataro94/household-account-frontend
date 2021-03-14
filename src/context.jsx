import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthentication } from './hooks';

export const LoginContext = React.createContext();
export const Provider = ({ children }) => {
	const [isLogin, setIsLogin] = useState();
	const { checkStorage, checkUid, clearSession } = useAuthentication();
	const history = useHistory();
	const jumpToSignIn = () => history.push('/signin');

	useEffect(() => {
		checkStorage(signIn, signOut);
	}, []);

	const signIn = async (user) => {
		await checkUid(user.uid);
		setIsLogin(true);
	};

	const signOut = async () => {
		await clearSession();
		jumpToSignIn();
		setIsLogin(false);
	};

	const value = { isLogin, setIsLogin };

	return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};

export function withAuth(Component) {
	const Consumer = (props) => {
		return <LoginContext.Consumer>{(state) => <Component {...props} {...state} />}</LoginContext.Consumer>;
	};
	return Consumer;
}
