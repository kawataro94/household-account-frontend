import React, { useState } from 'react';

export const LoginContext = React.createContext();
export const Provider = ({ children }) => {
	const [isLogin, setIsLogin] = useState();
	const value = { isLogin, setIsLogin };

	return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};

export function withAuth(Component) {
	const Consumer = (props) => {
		return <LoginContext.Consumer>{(state) => <Component {...props} {...state} />}</LoginContext.Consumer>;
	};
	return Consumer;
}
