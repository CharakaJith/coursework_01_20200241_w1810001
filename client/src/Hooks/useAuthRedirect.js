import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAccessToken } from '../util/authUtil';

const useAuthRedirect = (message = 'Oops! You must be logged in to proceed.') => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = checkAccessToken(message);
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, message]);
};

export default useAuthRedirect;
