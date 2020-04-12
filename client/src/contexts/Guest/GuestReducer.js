import {
	TOGGLE_GUESTFILTER,
	SEARCH_GUEST,
	CLEAR_SEARCH,
	ADD_GUEST,
	REMOVE_GUEST,
	EDIT_GUEST,
	UPDATE_GUEST,
	CLEAR_EDIT,
	GET_GUESTS,
	GUESTS_ERROR,
} from '../../actions';

export default (state, { type, payload }) => {
	switch (type) {
		case ADD_GUEST:
			return {
				...state,
				guests: [...state.guests, payload],
			};
		case EDIT_GUEST:
			return {
				...state,
				editable: payload,
			};
		case GET_GUESTS:
			return {
				...state,
				guests: payload,
			};
		case GUESTS_ERROR:
			return {
				...state,
				guests: [],
				errors: payload,
			};
		case CLEAR_EDIT:
			return {
				...state,
				editable: null,
			};
		case UPDATE_GUEST:
			return {
				...state,
				guests: state.guests.map((guest) =>
					guest._id === payload._id ? payload : guest
				),
			};
		case REMOVE_GUEST:
			return {
				...state,
				guests: state.guests.filter((guest) => guest._id !== payload),
			};
		case TOGGLE_GUESTFILTER:
			return {
				...state,
				filterGuest: !state.filterGuest,
			};
		case SEARCH_GUEST:
			const reg = new RegExp(`${payload}`, 'gi');
			return {
				...state,
				search: state.guests.filter((guest) => guest.fullName.match(reg)),
			};
		case CLEAR_SEARCH:
			return {
				...state,
				search: null,
			};
		default:
			return state;
	}
};
