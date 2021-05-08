import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'rsuite';

import Center from '../../components/Center';
import { LoginContext } from '../../context';
import { useAuthentication } from '../../hooks';
import SignUpForm from './widget/Form';
import { buttonMargin, title } from './style';

const SignUp = () => {
	const history = useHistory();
	const [formValue, setFormValue] = useState({
		groupName: '',
		account: '',
		email: '',
		password: '',
	});
	const { setUpAuth, createUser } = useAuthentication();
	const { setIsLogin } = useContext(LoginContext);
	const jumpToSignIn = () => history.push('/signin');

	const signUp = async () => {
		const userInfo = await setUpAuth(formValue);
		await createUser(userInfo);

		setIsLogin(false);
		jumpToSignIn();
	};

	const formProps = {
		formValue,
		setFormValue,
	};

	return (
		<Center>
			<h2 css={title}>Sign Up</h2>
			<SignUpForm {...formProps} />
			<div css={buttonMargin}>
				<Button appearance="primary" onClick={signUp}>
					Submit
				</Button>
			</div>
		</Center>
	);
};

export default SignUp;
