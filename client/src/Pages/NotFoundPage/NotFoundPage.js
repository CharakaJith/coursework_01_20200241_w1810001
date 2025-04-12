import './NotFoundPage.css';
import { Link } from 'react-router-dom';

import Footer from '../../Components/footer/footer';
import Navbar from '../../Components/navbar/navbar';

function NotFoundPage() {
  return (
    <div>
      <Navbar />

      <p className="error">404 -ERROR</p>
      <p className="error-text">PAGE NOT FOUND</p>
      <p className="error-subtext">Your search has taken you beyond the known universe.</p>

      {/* home page button */}
      <Link to="/" className="home-link">
        <button className="home-button">Go to Homepage</button>
      </Link>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
