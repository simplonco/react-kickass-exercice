import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    }
  }

  handleToggle = () => {
    let value = this.state.hidden =! this.state.hidden
    this.setState({hidden: value})
  }

  render() {
    const toggleVisibility =
    this.state.hidden == false ? 'active' : '';

    return (
      <nav>
        <ul className="nav-list">
          <li id="brand"><Link to="/">KickAssStarter</Link></li>
          <li className={toggleVisibility}><Link to="/users">Utilisateurs</Link></li>
          <li className={toggleVisibility}><Link to="/projects">Projets</Link></li>
          <li className={toggleVisibility}>Ajouts</li>
          <div id="toggle-nav" onClick={this.handleToggle}>
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
