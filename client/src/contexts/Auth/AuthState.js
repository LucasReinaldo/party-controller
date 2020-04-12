import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

import api from '../../services/api';

import setToken from '../../utils/set_token';

import {
	CLEAR_ERRORS,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTRE_FAIL,
	REGISTRE_SUCCESS,
	AUTH_ERROR,
	USER_LOADED,
} from '../../actions';

const AuthState = (props) => {
	const initialState = {
		user: null,
		userAuth: false,
		errors: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	//load user
	const loadUser = async () => {
		if (localStorage.token) {
			setToken(localStorage.token);
		}
		try {
			const response = await api.get('/my/user/');
			dispatch({
				type: USER_LOADED,
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
				payload: err.response.data.errors,
			});
		}
	};

	//registre user
	const registreUser = async (userData) => {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const response = await api.post('/new/user', userData, config);
			dispatch({
				type: REGISTRE_SUCCESS,
				payload: response.data,
			});
			loadUser();
		} catch (err) {
			dispatch({
				type: REGISTRE_FAIL,
				payload: err.response.data.errors,
			});
		}
	};

	//login user
	const loginUser = async (userData) => {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const response = await api.post('/user/auth', userData, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: response.data,
			});
			loadUser();
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data,
			});
		}
	};

	const setError = (err) => {
		dispatch({
			type: REGISTRE_FAIL,
			payload: [{ msg: err }],
		});
	};

	const clearError = (err) => {
		dispatch({
			type: CLEAR_ERRORS,
		});
	};

	const logout = () => {
		dispatch({
			type: LOGOUT,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				userAuth: state.userAuth,
				errors: state.errors,
				registreUser,
				loadUser,
				loginUser,
				logout,
				setError,
				clearError,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
