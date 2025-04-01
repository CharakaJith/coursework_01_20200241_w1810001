import './navbar.css';
import Logo from '../../assets/images/logo-full.jpg';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed-navbar">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="CountryScope Logo" className="logo-img" />
        </Link>
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
