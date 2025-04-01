import './sideNavbar.css';
import Logo from '../../assets/images/logo-full.jpg';
import { Link } from 'react-router-dom';

import logout from '../../assets/icons/logout.png';

function SideNavbar() {
  return (
    <div className="side-navbar">
      {/* logo */}
      <div className="logo-container">
        <Link to="/">
          <img src={Logo} alt="CountryScope Logo" className="logo-img" />
        </Link>
      </div>

      {/* links */}
      <div className="link-container">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">Profile</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* logout button */}
      <div className="btn-container">
        <button className="full-width-btn">
          <img src={logout} alt="Logout" className="btn-icon" /> Logout
        </button>
      </div>
    </div>
  );
}

export default SideNavbar;
