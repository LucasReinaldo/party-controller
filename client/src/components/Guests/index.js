import React, { useContext, useEffect } from 'react';

import GuestTable from '../GuestTable';
import GuestCard from '../GuestCard';

import GuestContext from '../../contexts/Guest/GuestContext';
import AuthContext from '../../contexts/Auth/AuthContext';

import './style.css';

const Home = () => {
	const { guests, filterGuest, search, loadGuests } = useContext(GuestContext);
	const { loadUser } = useContext(AuthContext);

	useEffect(() => {
		loadUser();
		loadGuests();
		// eslint-disable-next-line
	}, []);

	const handleFilterGuests = () => {
		try {
			const guestList =
				search === null
					? guests
							.filter((guest) => !filterGuest || guest.isConfirmed === true)
							.map((el) => <GuestCard guest={el} key={el._id} />)
					: search
							.filter((guest) => !filterGuest || guest.isConfirmed === true)
							.map((el) => <GuestCard guest={el} key={el._id} />);

			return guestList;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="guests">
				<div className="guest-table">
					<GuestTable />
				</div>
				<ul className="guests-card">{handleFilterGuests()}</ul>
			</div>
		</>
	);
};

export default Home;
