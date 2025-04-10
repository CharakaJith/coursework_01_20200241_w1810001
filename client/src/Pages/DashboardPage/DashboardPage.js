import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '../../Components/footer/footer';
import SideNavbar from '../../Components/side-navbar/sideNavbar';
import CountryDisplay from '../../Components/country-display/countryDisplay';
import useAuthRedirect from '../../Hooks/useAuthRedirect';

function DashboardPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useAuthRedirect();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  return (
    <dev>
      <SideNavbar />
      <CountryDisplay />
      <Footer />
    </dev>
  );
}

export default DashboardPage;
