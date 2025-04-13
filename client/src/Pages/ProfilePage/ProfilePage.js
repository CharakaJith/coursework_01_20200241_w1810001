import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SideNavbar from '../../Components/side-navbar/sideNavbar';
import Footer from '../../Components/footer/footer';
import ProfileDisplay from '../../Components/profile-display/profileDisplay';
import useAuthRedirect from '../../Hooks/useAuthRedirect';

function ProfilePage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useAuthRedirect();

  useEffect(() => {
    // check access token
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  return (
    <div>
      <SideNavbar />
      <ProfileDisplay />
      <Footer />
    </div>
  );
}

export default ProfilePage;
