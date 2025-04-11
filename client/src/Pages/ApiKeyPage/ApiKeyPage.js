import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SideNavbar from '../../Components/side-navbar/sideNavbar';
import Footer from '../../Components/footer/footer';
import KeyDisplay from '../../Components/key-display/keyDisplay';
import useAuthRedirect from '../../Hooks/useAuthRedirect';

function ApiKeyPage() {
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
      <KeyDisplay />
      <Footer />
    </div>
  );
}

export default ApiKeyPage;
