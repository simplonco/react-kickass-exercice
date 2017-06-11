import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () =>
{
      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/">
                <span className="navbar-brand" href="#">KickAssStarter</span>
              </Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                  <li><Link to="/users">Utilisateur</Link>
                  <span className="sr-only">(current)</span></li>
                  <li><Link to="/projects">Projets</Link></li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Ajouts
                      <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li>Créer un nouvel utilisateur</li>
                      <li>Créer un nouveau projet</li>
                    </ul>
                  </li>
              </ul>
            </div>
          </div>
        </nav>
      )
  }

export default Navbar;
