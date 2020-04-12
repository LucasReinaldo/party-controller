import React, { useContext, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';

import GuestRegistre from './components/GuestRegistre';
import Guests from './components/Guests';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import GuestState from './contexts/Guest/GuestState';
import AuthState from './contexts/Auth/AuthState';

import AuthContext from './contexts/Auth/AuthContext';

import setToken from './utils/set_token';

import './global.css';

if (localStorage.token) {
	setToken(localStorage.token);
}

function App() {
	const PrivateRoute = ({ component: Component, ...rest }) => {
		const { userAuth, loadUser } = useContext(AuthContext);

		useEffect(() => {
			loadUser();
			// eslint-disable-next-line
		}, []);

		return (
			<Route
				{...rest}
				render={(props) =>
					!userAuth ? <Redirect to="/sign-in" /> : <Component {...props} />
				}
			/>
		);
	};
	return (
		<AuthState>
			<GuestState>
				<Router>
					<Navbar />
					<Switch>
						<PrivateRoute exact path="/" component={Home} />
						<Route exact path="/invite/guest" component={GuestRegistre} />
						<Route exact path="/guests" component={Guests} />
						<Route exact path="/sign-up" component={SignUp} />
						<Route exact path="/sign-in" component={SignIn} />
					</Switch>
				</Router>
			</GuestState>
		</AuthState>
	);
}

export default App;
