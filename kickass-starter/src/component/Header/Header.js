import React from 'react';
import { Link } from 'react-router-dom'
import './header.css';

const Header = () => (
	<div id="header">
		<Link to="/">
			<h1>
				<span className="blue-text">Kick</span>ass <span className="blue-text">S</span>tarter
		</h1>
		</Link>

		<ul className="navbar">
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/newuser'>Create User</Link>
			</li>
			<li>
				<Link to='/newproject'>Create Project</Link>
			</li>
		</ul>
	</div>
);

export default Header;