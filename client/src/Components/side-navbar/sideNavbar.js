import './sideNavbar.css';
import Logo from '../../assets/images/logo-full.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import logout from '../../assets/icons/logout.png';

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

      {/* links */}
      <div className="link-container">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Countries</Link>
          </li>
          <li>
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
