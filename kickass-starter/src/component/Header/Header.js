import React from 'react';
import { Link } from 'react-router-dom'
import './header.css';

const Header = () => (
	<div id="header">
		<Link to="/">
			<h1 className="gradient-text">
				<span className="blue-text">Kick</span>ass <span className="blue-text">S</span>tarter
		</h1>
		</Link>

		<ul className="navbar">
			<li>
				<Link to='/'>Home</Link>
				<hr />
			</li>
			<li>
				<Link to='/newuser'>Create User</Link>
				<hr />
			</li>
			<li>
				<Link to='/newproject'>Create Project</Link>
				<hr />
			</li>
		</ul>
	</div>
);

export default Header;