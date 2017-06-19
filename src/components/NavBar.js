import React from 'react';
import { Link } from 'react-router-dom';




const NavBar = () => (
    <div>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/userslist">Liste des membres</Link></li>
        <li><Link to="/addusers">Ajouter un membre</Link></li>
        <li><Link to="/editprojects">Editer les projets</Link></li>
      </ul>
    </div>
)

export default NavBar;