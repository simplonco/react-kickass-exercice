import React from 'react';
import { Link } from 'react-router-dom'
import './header.css';

const Header = () => (
	<div id="header">
		<h1>Kickass Starter</h1>

		<div className="">
			<Link to='/'>Home</Link>
			<Link to='/about'>About</Link>
		</div>
	</div>
);

export default Header;