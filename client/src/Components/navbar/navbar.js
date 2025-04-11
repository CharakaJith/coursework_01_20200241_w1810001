import './navbar.css';
import Logo from '../../assets/images/logo-full.jpg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userObject = storedUser ? JSON.parse(storedUser) : null;

    setUser(userObject);
  }, []);

  return (
    <nav className="fixed-navbar">
      {/* logo */}
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="CountryScope Logo" className="logo-img" />
        </Link>
      </div>

      {/* nav links */}
      <div className="nav-center">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            {user ? (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            ) : (
              <></>
            )}
          </li>
        </ul>
      </div>

      {/* login and signup */}
      <div className="auth-links">
        {user ? (
          <Link to="/profile" className="dashboard-link">
            {user.firstName} {user.lastName}
          </Link>
        ) : (
          <>
            <Link to="/login" className="login-link">
              Login
            </Link>
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
