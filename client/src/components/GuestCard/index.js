import React, { useContext } from 'react';
import GuestContext from '../../contexts/Guest/GuestContext';

import './style.css';

function GuestCard({ guest }) {
	const { removeGuest, editGuest, confirmGuest } = useContext(GuestContext);

	const { _id, fullName, phoneNumber, dietary, isConfirmed, email } = guest;

	const handleRemoveGuest = () => {
		removeGuest(_id);
	};

	const handleEditGuest = () => {
		editGuest(guest);
	};

	const handleConfirmGuest = () => {
		confirmGuest({ ...guest, isConfirmed: !isConfirmed });
	};

	return (
		<>
			<li className="guest-card">
				<header className="card-head">
					<span className="confirm">
						<label>
							Confirmed
							<i className={`fas fa-check-square ${isConfirmed && 'confirm'}`}>
								<input type="checkbox" onClick={handleConfirmGuest} />{' '}
							</i>
						</label>
					</span>
					<label className={'diet ' + dietary}>{dietary}</label>
				</header>
				<div className="card-body">
					<h5>{fullName}</h5>
					<div className="contact-phone">
						<i className="fas fa-phone-alt"></i>
						<span>{phoneNumber}</span>
					</div>
					<div className="contact-mail">
						<i className="fas fa-at"></i>
						<span>{email}</span>
					</div>
				</div>
				<div className="btn-options">
					<button
						className="btn-edit"
						title="Edit Guest"
						onClick={handleEditGuest}>
						<i className="fas fa-user-edit"></i>
					</button>
					<button
						className="btn-remove"
						title="Remove Guest"
						onClick={handleRemoveGuest}>
						<i className="fas fa-trash-alt remove"></i>
					</button>
				</div>
			</li>
		</>
	);
}

export default GuestCard;
