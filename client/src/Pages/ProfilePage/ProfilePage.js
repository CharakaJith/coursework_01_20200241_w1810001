import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SideNavbar from '../../components/side-navbar/sideNavbar';
import Footer from '../../components/footer/footer';
import ProfileDisplay from '../../components/profile-display/profileDisplay';

function ProfilePage() {
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
    <div>
      <SideNavbar />
      <ProfileDisplay />
      <Footer />
    </div>
  );
}

export default ProfilePage;
