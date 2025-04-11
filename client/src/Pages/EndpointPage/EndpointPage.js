import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SideNavbar from '../../Components/side-navbar/sideNavbar';
import Footer from '../../Components/footer/footer';
import EndpointDisplay from '../../Components/endpoint-display/endpointDisplay';
import useAuthRedirect from '../../Hooks/useAuthRedirect';

function EndpointPage() {
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
    <div>
      <SideNavbar />
      <EndpointDisplay />
      <Footer />
    </div>
  );
}

export default EndpointPage;
