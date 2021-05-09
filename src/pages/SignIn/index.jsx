import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'rsuite';

import Center from '../../components/Center';
import { LoginContext } from '../../context';
import { useAuthentication } from '../../hooks';
import SignInForm from './widget/SignInForm';
import { buttonMargin, title } from './style';

const SignIn = () => {
	const { isLogin, setIsLogin } = useContext(LoginContext);
	const { checkAuth } = useAuthentication();
	const history = useHistory();
	const jumpToDashboard = () => history.push('/');
	const jumpToSignUp = () => history.push('/signup');
	const [formValue, setFormValue] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		if (isLogin) jumpToDashboard();
	}, [isLogin]);

	const signIn = () => {
		checkAuth(formValue).then(() => {
			setIsLogin(true);
			jumpToDashboard();
		});
	};

	const formProps = {
		formValue,
		setFormValue,
	};

	return (
		<Center>
			<h2 css={title}>Sign In</h2>
			<SignInForm {...formProps} />
			<div css={buttonMargin}>
				<Button appearance="primary" onClick={() => jumpToSignUp()}>
					Sign Up
				</Button>
				<Button appearance="primary" onClick={() => signIn()}>
					Submit
				</Button>
			</div>
		</Center>
	);
};

export default SignIn;
