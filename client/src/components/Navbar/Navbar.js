import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/Auth/AuthContext';

import Home from '../Home';
import GuestSearchBar from '../GuestSearchBar';
import GuestFilter from '../GuestFilter';

import './Navbar.css';

const Navbar = () => {
	const { logout, clearError, user } = useContext(AuthContext);

	const handleLogout = () => {
		logout();
		clearError();
	};

	const HomeLinks = (
		<Fragment>
			<li className="nav-item active">
				<Link className="nav-link" to="#">
					Home
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="#">
					Contact
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/sign-in">
					Sign In
				</Link>
			</li>
		</Fragment>
	);

	const LoggedLinks = (
		<Fragment>
			<li className="nav-item">
				<Link className="nav-link" to="#">
					Hello, {user && user.username}
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="#" onClick={handleLogout}>
					Logout
				</Link>
			</li>
		</Fragment>
	);
	return (
		<nav className="wrapper">
			<aside className="sidebar">
				<span className="brand">
					<Link to="/">
						Party Solutions <i className="fas fa-cocktail"></i>
					</Link>
				</span>
				<ul>
					<li>
						<Link to="/">
							<i className="fas fa-home"></i>Home
						</Link>
					</li>
					<li>
						<Link to="#">
							<i className="fas fa-user"></i>Profile
						</Link>
					</li>
					<li>
						<Link to="/invite/guest">
							<i className="fas fa-handshake"></i>Invite
						</Link>
					</li>
					<li>
						<Link to="/guests">
							<i className="fas fa-table"></i>Guests
						</Link>
					</li>
					<li>
						<Link to="#">
							<i className="fas fa-chart-pie"></i>Reports
						</Link>
					</li>
					<li>
						<Link to="#" onClick={handleLogout}>
							<i className="fas fa-sign-out-alt"></i>Logout
						</Link>
					</li>
				</ul>
				<div className="social_media">
					<Link to="#">
						<i className="fab fa-facebook-f"></i>
					</Link>
					<Link to="#">
						<i className="fab fa-twitter"></i>
					</Link>
					<Link to="#">
						<i className="fab fa-instagram"></i>
					</Link>
				</div>
			</aside>
			<div className="main_content">
				<div className="header">
					Welcome, {user && user.username}!!
					<span className="guests-search">
						<GuestSearchBar />
					</span>
					<div className="guests-options">
						<GuestFilter />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
