import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from '../../contexts/Auth/AuthContext';

import './style.css';

const SignIn = () => {
	const { loginUser, userAuth, errors, setError, clearError } = useContext(
		AuthContext
	);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const history = useHistory();

	useEffect(() => {
		if (userAuth) {
			history.push('/');
		}
	}, [userAuth, history]);

	const handleSignIn = async (e) => {
		e.preventDefault();

		try {
			loginUser({ email, password });
			clearError();
		} catch (err) {
			setError({ err, msg: 'Check your credentials or sign-up.' });
		}
	};

	return (
		<>
			<div className="sign-in">
				<h1>SIGN IN:</h1>
				<form onSubmit={handleSignIn} className="sign-in">
					<i class="fas fa-at">
						<input
							type="email"
							name="email"
							placeholder="E-mail"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</i>
					<i class="fas fa-unlock-alt">
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</i>
					<button className="btn-sign" type="submit" name="submit">
						SIGN IN
					</button>
				</form>
				<div className="question">
					{errors !== null && (
						<button className="danger">
							<span onClick={() => clearError()}>X</span>
						</button>
					)}
					<p>
						{`Don't have an account? `} <Link to="/sign-up">Sign Up</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default SignIn;
