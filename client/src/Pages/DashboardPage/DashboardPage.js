import './DashboardPage.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';

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
      <Navbar />
      <h1>huttoo</h1>
      <Footer />
    </dev>
  );
}

export default DashboardPage;
