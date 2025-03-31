import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <nav className="fixed-navbar">
      <div className="logo">
        <h1>CountryScope</h1>
      </div>
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
        </ul>
      </div>
      <div className="auth-links">
        <Link to="/login" className="login-link">
          Login
        </Link>
        <Link to="/signup" className="signup-link">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
