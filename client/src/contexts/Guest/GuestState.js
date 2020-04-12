import React, { useReducer } from 'react';

import GuestContext from './GuestContext';
import GuestReducer from './GuestReducer';

import api from '../../services/api';

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

export const GuestState = (props) => {
	const initialState = {
		filterGuest: false,
		search: null,
		editable: null,
		guests: [],
		errors: null,
	};

	const [state, dispatch] = useReducer(GuestReducer, initialState);

	const addGuest = async (guest) => {
		await api.post('/invite/guest', guest);
		dispatch({
			type: ADD_GUEST,
			payload: guest,
		});
	};

	const editGuest = (guest) => {
		dispatch({
			type: EDIT_GUEST,
			payload: guest,
		});
	};

	const loadGuests = async () => {
		const response = await api.get('/guests');
		try {
			dispatch({
				type: GET_GUESTS,
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: GUESTS_ERROR,
				payload: err.response,
			});
		}
	};

	const clearEditGuest = () => {
		dispatch({
			type: CLEAR_EDIT,
		});
	};

	const removeGuest = async (id) => {
		await api.delete(`/delete/guest/${id}`);
		dispatch({
			type: REMOVE_GUEST,
			payload: id,
		});
	};

	const confirmGuest = async (guest) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			await api.put(`/update/guest/${guest._id}`, guest, config);
			dispatch({
				type: UPDATE_GUEST,
				payload: guest,
			});
			loadGuests();
		} catch (err) {
			dispatch({
				type: GUESTS_ERROR,
				payload: err.response,
			});
		}
	};

	const toggleFilter = () => {
		dispatch({
			type: TOGGLE_GUESTFILTER,
		});
	};

	const searchGuest = (guest) => {
		dispatch({
			type: SEARCH_GUEST,
			payload: guest,
		});
	};

	const clearSearchGuest = () => {
		dispatch({
			type: CLEAR_SEARCH,
		});
	};

	return (
		<div>
			<GuestContext.Provider
				value={{
					filterGuest: state.filterGuest,
					guests: state.guests,
					search: state.search,
					editable: state.editable,
					addGuest,
					clearSearchGuest,
					confirmGuest,
					editGuest,
					loadGuests,
					clearEditGuest,
					removeGuest,
					searchGuest,
					toggleFilter,
				}}>
				{props.children}
			</GuestContext.Provider>
		</div>
	);
};

export default GuestState;
