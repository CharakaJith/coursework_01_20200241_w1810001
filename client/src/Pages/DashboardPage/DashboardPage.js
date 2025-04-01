import './DashboardPage.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '../../components/footer/footer';
import SideNavbar from '../../components/side-navbar/sideNavbar';

function DashboardPage() {
  const navigate = useNavigate();

  // check the access token
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      localStorage.setItem('signupMessage', 'Oops! You must be logged in to proceed.');

      navigate('/login');
    }
  }, [navigate]);

  return (
    <dev>
      <SideNavbar />
      <Footer />
    </dev>
  );
}

export default DashboardPage;
