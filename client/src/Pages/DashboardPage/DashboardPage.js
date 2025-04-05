import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '../../Components/footer/footer';
import SideNavbar from '../../Components/side-navbar/sideNavbar';
import CountryDisplay from '../../Components/country-display/countryDisplay';

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
      <CountryDisplay />
      <Footer />
    </dev>
  );
}

export default DashboardPage;
