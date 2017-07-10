import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
      dropdownBtn: false
    }
  }

  ToggleNavVisibility = () => {
    this.setState({showNav: this.state.hiddenNav =! this.state.hiddenNav})
  }

  handleDropdownButon = () => {
    this.setState({dropdownBtn: this.state.dropdownBtn =! this.state.dropdownBtn})
  }

  render() {
    const toggleVisibility =
    this.state.hiddenNav === true ? 'active' : '';

    const dropdownBtn =
    this.state.dropdownBtn === true ? 'dropdown-list' : '';

    return (
      <nav>
        <ul className="nav-list">
          <li id="brand"><NavLink exact to="/">KickAssStarter</NavLink></li>
          <li className={toggleVisibility}><NavLink exact to="/users">Utilisateurs</NavLink></li>
          <li className={toggleVisibility}><NavLink exact to="/projects">Projets</NavLink></li>
          <li id="dropdown-btn" className={toggleVisibility} onClick={this.handleDropdownButon}>Ajouts
            <ul className={dropdownBtn}>
              <NavLink to='/usersForm'><li className="none">ajouter un utilisateur</li></NavLink>
              <NavLink to='/projectsForm'><li className="none">ajouter un projet</li></NavLink>
            </ul>
          </li>
          <div id="toggle-nav" onClick={this.ToggleNavVisibility}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </ul>
      </nav>
    )
  }
}

export default Navbar;
