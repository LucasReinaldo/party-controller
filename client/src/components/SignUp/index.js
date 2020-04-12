import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/Auth/AuthContext';

import './style.css';

const SignUp = () => {
	const { registreUser, userAuth, errors, setError, clearError } = useContext(
		AuthContext
	);

	const [fullName, setFullName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const history = useHistory();

	useEffect(() => {
		if (userAuth) {
			history.push('/');
		}
	}, [userAuth, history]);

	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			if (password !== confirmPassword) {
				setError({ msg: 'Password must match!' });
			} else {
				registreUser({ fullName, username, email, password });
				clearError();
			}
		} catch (err) {
			alert(err, 'Check your credentials or sign-up.');
		}
	};

	return (
		<>
			<div className="sign-up">
				<h1>SIGN UP:</h1>
				<form onSubmit={handleSignUp} className="sign-up">
					<i class="fas fa-user">
						<input
							type="text"
							name="name"
							placeholder="Full name"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
						/>
					</i>
					<i class="fas fa-smile">
						<input
							type="text"
							name="username"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</i>
					<i class="fas fa-at">
						<input
							type="email"
							name="email"
							placeholder="Your best e-mail"
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
					<i class="fas fa-unlock-alt">
						<input
							type="password"
							name="password2"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</i>
					<button className="btn-sign" type="submit" name="submit">
						CREATE ACCOUNT
					</button>
				</form>
				<div className="question">
					<hr></hr>
					{errors !== null && (
						<button className="danger">
							{errors.msg ? errors.msg : errors.error[0]}
							<span onClick={() => clearError()}>X</span>
						</button>
					)}
					<p>
						Already have an account? {''} <Link to="/sign-in">Sign In</Link>
					</p>
					<p>
						By creating an account you agree to our{' '}
						<Link to="#">{`Terms & Privacy`}</Link>.
					</p>
				</div>
			</div>
		</>
	);
};

export default SignUp;
