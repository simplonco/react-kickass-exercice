import React from 'react';
import { NavLink } from 'react-router-dom'
import './header.css';

const Header = () => (
	<div id="header">
		<NavLink to="/">
			<h1 className="gradient-text">
				<span className="blue-text">Kick</span>ass <span className="blue-text">S</span>tarter
		</h1>
		</NavLink>

		<ul className="navbar">
			<li>
				<NavLink exact activeClassName="active" to='/' >
					<span>Home</span>
					<hr />
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName={"active"} to='/newuser'>
					<span>Create User</span>
					<hr />
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName="active" to='/newproject'>
					<span>Create Project</span>
					<hr />
				</NavLink>
			</li>
		</ul>
	</div>
);

export default Header;