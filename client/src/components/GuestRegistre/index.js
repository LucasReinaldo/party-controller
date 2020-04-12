import React, { useState, useContext, useEffect } from 'react';

import GuestContext from '../../contexts/Guest/GuestContext';

import './style.css';

const GuestRegistre = () => {
	const { addGuest, editable, confirmGuest, clearEditGuest } = useContext(
		GuestContext
	);

	useEffect(() => {
		if (editable !== null) {
			setGuest(editable);
		} else
			setGuest({
				fullName: '',
				phoneNumber: '',
				email: '',
				dietary: 'Non-Veg',
			});
	}, [editable]);

	const [guest, setGuest] = useState({
		fullName: '',
		phoneNumber: '',
		email: '',
		dietary: 'Non-Veg',
		isConfirmed: false,
	});

	const { fullName, phoneNumber, email } = guest;

	const handleData = (e) => {
		e.preventDefault();

		setGuest({
			...guest,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (editable !== null) {
			confirmGuest(guest);
			clearEditGuest();
		} else {
			addGuest(guest);
			setGuest({
				fullName: '',
				phoneNumber: '',
				email: '',
				dietary: 'Non-Veg',
			});
		}
	};

	return (
		<>
			<div className="form-guest-list">
				<h2>{editable === null ? 'Invite Guest' : 'Edit Guest'}</h2>
				<form onSubmit={handleSubmit}>
					<div className="invitation-form">
						<input
							type="text"
							name="fullName"
							placeholder="Name"
							value={fullName}
							onChange={handleData}
						/>
						<input
							type="text"
							name="phoneNumber"
							placeholder="Phone"
							value={phoneNumber}
							onChange={handleData}
						/>
						<input
							type="text"
							name="email"
							placeholder="email"
							value={email}
							onChange={handleData}
						/>
						<p>Options:</p>
						<div className="guest-options">
							<label className="label-option">
								Gluten Free
								<input
									type="checkbox"
									className="input-checkbox"
									name="dietary"
									value="Gluten Free"
									onChange={handleData}
								/>
								<span className="checkmark"></span>
							</label>
							<label className="label-option">
								Vegetarian
								<input
									className="input-checkbox"
									type="radio"
									name="dietary"
									value="Vegetarian"
									onChange={handleData}
								/>
								<span className="checkmark"></span>
							</label>
							<label className="label-option">
								Vegan
								<input
									className="input-checkbox"
									type="radio"
									name="dietary"
									value="Vegan"
									onChange={handleData}
								/>
								<span className="checkmark"></span>
							</label>
						</div>
						<button type="submit" value="Add Guest">
							SUBMIT
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default GuestRegistre;
