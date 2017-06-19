import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenNav: true,
      dropdownBtn: true
    }
  }

  ToggleNavVisibility = () => {
    let hidden = this.state.hiddenNav =! this.state.hiddenNav
    this.setState({hiddenNav: hidden})
  }

  handleDropdownButon = () => {
    let hidden = this.state.dropdownBtn =! this.state.dropdownBtn;
    this.setState({dropdownBtn: hidden})
  }

  render() {
    const toggleVisibility =
    this.state.hiddenNav == false ? 'active' : '';

    const dropdownBtn =
    this.state.dropdownBtn == false ? 'dropdown-list' : '';

    return (
      <nav>
        <ul className="nav-list">
          <li id="brand"><Link to="/">KickAssStarter</Link></li>
          <li className={toggleVisibility}><Link to="/users">Utilisateurs</Link></li>
          <li className={toggleVisibility}><Link to="/projects">Projets</Link></li>
          <li id="dropdown-btn" className={toggleVisibility} onClick={this.handleDropdownButon}>Ajouts
            <ul className={dropdownBtn}>
              <Link to='/usersForm'><li className="none">ajouter un utilisateur</li></Link>
              <Link to='/projectsForm'><li className="none">ajouter un projet</li></Link>
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
