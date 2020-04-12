import {
	AUTH_ERROR,
	CLEAR_ERRORS,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTRE_FAIL,
	REGISTRE_SUCCESS,
	USER_LOADED,
} from '../../actions';

export default (state, { type, payload }) => {
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				user: payload,
				errors: null,
				userAuth: true,
			};
		case REGISTRE_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, ...payload, userAuth: true, errors: null };
		case REGISTRE_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				userAuth: null,
				errors: payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				errors: null,
			};
		default:
			return state;
	}
};
