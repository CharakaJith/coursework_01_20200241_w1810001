import './sideNavbar.css';
import Logo from '../../assets/images/logo-full.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import logout from '../../assets/icons/logout.png';
import homeWhite from '../../assets/icons/home-white.png';
import locationWhite from '../../assets/icons/location-white.png';
import keyWhite from '../../assets/icons/key-white.png';
import endpointWhite from '../../assets/icons/endpoint-white.png';
import userWhite from '../../assets/icons/user-white.png';

function SideNavbar() {
  const navigate = useNavigate();

  // handle logout
  const handleLogout = (event) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    navigate('/');
  };

  return (
    <div className="side-navbar">
      {/* logo */}
      <div className="logo-container">
        <Link to="/">
          <img src={Logo} alt="CountryScope Logo" className="logo-img" />
        </Link>
      </div>

      {/* nav links */}
      <div className="link-container">
        <ul className="nav-links">
          <li>
            <img src={homeWhite} alt="Home" className="btn-icon" />
            <Link to="/">Home</Link>
          </li>
          <li>
            <img src={locationWhite} alt="Country" className="btn-icon" />
            <Link to="/dashboard">Countries</Link>
          </li>
          <li>
            <img src={keyWhite} alt="Key" className="btn-icon" />
            <Link to="/keys">API Keys</Link>
          </li>
          <li>
            <img src={endpointWhite} alt="Endpoint" className="btn-icon" />
            <Link to="/endpoints">Endpoints</Link>
          </li>
          <li>
            <img src={userWhite} alt="User" className="btn-icon" />
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>

      {/* logout button */}
      <div className="btn-container">
        <button className="full-width-btn" onClick={handleLogout}>
          <img src={logout} alt="Logout" className="btn-icon" /> Logout
        </button>
      </div>
    </div>
  );
}

export default SideNavbar;
