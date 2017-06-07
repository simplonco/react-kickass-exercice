import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () =>  {
      return (
          <ul className="nav-container">
            <Link to="/"><li>Home</li></Link>
            <Link to="/users"><li>Users</li></Link>
            <Link to="/projects"><li>Projects</li></Link>
          </ul>
      )
  }

export default Navbar;
