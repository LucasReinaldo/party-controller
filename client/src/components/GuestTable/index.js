import React, { useContext } from 'react';

import GuestContext from '../../contexts/Guest/GuestContext';

import './style.css';

const GuestTable = () => {
	const { guests } = useContext(GuestContext);

	const totalInvited = guests.length;
	const attending = guests.filter((guest) => guest.isConfirmed);
	const totalAttending = attending.length;

	const invitedByDiet = (type) =>
		guests.filter((guest) => guest.dietary === type).length;

	const attendingByDiet = (type) =>
		attending.filter((guest) => guest.dietary === type).length;

	return (
		<div className="guest-counter-table">
			<table>
				<thead>
					<tr id="tr-head">
						<th>Guest</th>
						<th>Invited</th>
						<th>Attending</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Non-Veg</th>
						<th>{invitedByDiet('Non-Veg')}</th>
						<th>{attendingByDiet('Non-Veg')}</th>
					</tr>
					<tr>
						<th>Glutem Free</th>
						<th>{invitedByDiet('Glutem Free')}</th>
						<th>{attendingByDiet('Glutem Free')}</th>
					</tr>
					<tr>
						<th>Vegetarian</th>
						<th>{invitedByDiet('Vegetarian')}</th>
						<th>{attendingByDiet('Vegetarian')}</th>
					</tr>
					<tr>
						<th>Vegan</th>
						<th>{invitedByDiet('Vegan')}</th>
						<th>{attendingByDiet('Vegan')}</th>
					</tr>
					<tr className="table-total">
						<th>Total</th>
						<th>{totalInvited}</th>
						<th>{totalAttending}</th>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default GuestTable;
