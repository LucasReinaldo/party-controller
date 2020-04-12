import React, { useContext, useRef } from 'react';

import GuestContext from '../../contexts/Guest/GuestContext';

import './style.css';

function GuestSearchBar() {
	const { searchGuest, clearSearchGuest } = useContext(GuestContext);
	const searchValue = useRef('');

	const handleSearch = (e) => {
		if (searchValue.current.value !== '') {
			searchGuest(e.target.value);
		} else {
			clearSearchGuest();
		}
	};

	return (
		<div className="guest-search">
			<input
				ref={searchValue}
				type="text"
				onChange={handleSearch}
				className="search"
				placeholder="Search by name"
			/>
			<i className="fas fa-search search-icon"></i>
		</div>
	);
}

export default GuestSearchBar;
