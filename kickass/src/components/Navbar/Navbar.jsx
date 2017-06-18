import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul className="nav-list">
        <li id="brand"><Link to="/">KickAssStarter</Link></li>
        <li><Link to="/users">Utilisateurs</Link></li>
        <li><Link to="/projects">Projets</Link></li>
        <li>Ajouts</li>
          <div id="toggle-nav">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
      </ul>
    </nav>
  )
}

export default Navbar;
