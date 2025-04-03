import './loginForm.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: apiUrl,
});

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // remove access token
    localStorage.removeItem('accessToken');

    const signupMessage = localStorage.getItem('signupMessage');
    if (signupMessage) {
      setMessage(signupMessage);
      localStorage.removeItem('signupMessage');

      // remove the message after 5 seconds
      const timer = setTimeout(() => {
        setMessage('');
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, []);
  const navigate = useNavigate();

  // validate form fields
  const isFormValid = () => {
    return email && password;
  };

  // submit form
  const submitForm = (event) => {
    event.preventDefault();

    try {
      if (!email || email.trim().length === 0 || !password || password.trim().length === 0) {
        setError('One or more fields are empty!');
        setIsError(true);
      } else {
        const body = {
          email: email,
          password: password,
        };

        api
          .post('/api/v1/user/login', body, {})
          .then((res) => {
            if (res.data.success === true) {
              // set access token
              const accessToken = res.headers['Access-Token'] || res.headers['access-token'];
              if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('user', JSON.stringify(res.data.response.data.user));
              }

              navigate('/dashboard');
            }
          })
          .catch((error) => {
            console.error(`Error loging in user: ${error.message}`);

            if (error.response) {
              setError(error.response.data.response.data.message);
              setIsError(true);
            }
          });
      }
    } catch (error) {}
  };

  // handle email on change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (email) {
      setIsError(false);
    } else {
    }
  };

  // handle password on change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    if (password) {
      setIsError(false);
    } else {
    }
  };

  return (
    <div>
      <div className="login-form-wrapper">
        {/* success message box */}
        {message && <div className="success-box">{message}</div>}

        {/* log in form */}
        <form onSubmit={submitForm}>
          <h1>Log in</h1>

          <div className="input-box">
            <p>Email</p>
            <input value={email} onChange={handleEmailChange} type="email" placeholder="Enter your email" />
          </div>
          <div className="input-box">
            <p>Password</p>
            <input value={password} onChange={handlePasswordChange} type="password" placeholder="Enter your password" />
          </div>

          {/* error box */}
          <>
            {isError ? (
              <div className="error-box">
                <text>{error}</text>
              </div>
            ) : (
              <></>
            )}
          </>

          {/* log in button */}
          <div>
            <button className={`btn ${isError || !isFormValid() ? 'disabled-btn' : ''}`} disabled={isError || !isFormValid()}>
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
