import React, { useContext } from 'react';

import GuestContext from '../../contexts/Guest/GuestContext';

import './style.css';

const GuestFilter = () => {
	const { toggleFilter } = useContext(GuestContext);

	return (
		<div className="guests-filter toggle">
			<label className="switch">
				<input type="checkbox" onChange={() => toggleFilter()} />
				<span className="slider round"></span>
			</label>
			<p>Attending only.</p>
		</div>
	);
};

export default GuestFilter;
