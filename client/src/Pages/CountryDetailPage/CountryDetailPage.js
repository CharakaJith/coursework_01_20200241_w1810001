import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Footer from '../../Components/footer/footer';
import SideNavbar from '../../Components/side-navbar/sideNavbar';
import CountryDetails from '../../Components/country-details/countryDetails';
import useAuthRedirect from '../../Hooks/useAuthRedirect';

function CountryDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
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
    <div>
      <SideNavbar />
      <CountryDetails countryId={id} />
      <Footer />
    </div>
  );
}

export default CountryDetailPage;
