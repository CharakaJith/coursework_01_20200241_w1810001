export const checkAccessToken = (message = 'Oops! You must be logged in to proceed.') => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    localStorage.setItem('signupMessage', message);

    return false;
  }
  return true;
};
