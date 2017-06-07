import React from 'react';
import { Link } from 'react-router-dom'
import './header.css';

const Header = () => (
	<div id="header">
		<h1><span className="blue-text">Kick</span>ass <span className="blue-text">S</span>tarter</h1>

		<ul className="navbar">
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/newuser'>Create User</Link>
			</li>
		</ul>
	</div>
);

export default Header;