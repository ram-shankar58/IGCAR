import React from 'react';
import { Link } from 'react-router-dom';

const handleLogout = () => {
  localStorage.removeItem("user");
}

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const allowedDesignations = ['E', 'F', 'G'];

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">
          <img src={require("../static/igcar.jpeg")} alt="Logo" style={{ height: '60px', marginRight: '10px' }} /> {/* Logo image */}
        </a>
        <div className="navbar-item has-text-weight-bold has-text-white">
          Indira Gandhi Centre of Atomic Research, Kalpakkam
        </div>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <Link className="navbar-item" to="/">Home</Link>
          <Link className="navbar-item" to="/meeting">Meeting</Link>
          <Link className="navbar-item" to="/profile">Profile</Link>
          <Link className="navbar-item" to="/settings">Settings</Link>
          <Link className="navbar-item" to="/notifications">Notifications</Link>
          {user && allowedDesignations.includes(user.designation) && (
            <>
              <Link className="navbar-item" to="/reports">Reports</Link>
              <Link className="navbar-item" to="/analytics">Analytics</Link>
            </>
          )}
          <Link className="navbar-item" onClick={handleLogout} to="/login">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
