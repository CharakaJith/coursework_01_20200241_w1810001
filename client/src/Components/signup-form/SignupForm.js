import './SignupForm.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { USER, VALIDATE } from '../../common/messages';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: apiUrl,
});

function SignupForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // remove access token and user
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }, []);

  const navigate = useNavigate();

  // validate form fields
  const isFormValid = () => {
    return firstname && lastname && email && password && confirmPassword && password === confirmPassword;
  };

  // submit form
  const submitForm = (event) => {
    event.preventDefault();

    try {
      if (
        !firstname ||
        firstname.trim().length === 0 ||
        !lastname ||
        lastname.trim().length === 0 ||
        !email ||
        email.trim().length === 0 ||
        !password ||
        password.trim().length === 0 ||
        !confirmPassword ||
        confirmPassword.trim().length === 0
      ) {
        setError(VALIDATE.EMPTY_FIELDS);
        setIsError(true);
      } else {
        const body = {
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: password,
        };

        api
          .post('/api/v1/user', body, {})
          .then((res) => {
            if (res.data.success === true) {
              localStorage.setItem('signupMessage', USER.SIGNED_UP);

              navigate('/login');
            } else {
            }
          })
          .catch((error) => {
            console.error(`Error creating user: ${error.message}`);

            if (error.response) {
              setError(error.response.data.response.data.message);
              setIsError(true);
            }
          });
      }
    } catch (error) {}
  };

  // handle first name on change
  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);

    if (firstname) {
      setIsError(false);
    }
  };

  // handle last name on change
  const handleLastnameChange = (e) => {
    setLastname(e.target.value);

    if (lastname) {
      setIsError(false);
    }
  };

  // handle email on change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    if (email) {
      setIsError(false);
    }
  };

  // handle password on change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // check if confirmPassword is already filled
    if (confirmPassword && newPassword !== confirmPassword) {
      setIsError(true);
      setError(VALIDATE.PASSWORD_MISMATCH);
    } else {
      setIsError(false);
      setError('');
    }
  };

  // handle confrim password on change
  const handleConfrimPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setIsError(true);
      setError(VALIDATE.PASSWORD_MISMATCH);
    } else {
      setIsError(false);
      setError('');
    }
  };

  return (
    <div className="signup-form-wrapper">
      {/* sign up form */}
      <form onSubmit={submitForm}>
        <h1>Sign up</h1>

        <div className="input-box">
          <p>First name</p>
          <input value={firstname} onChange={handleFirstnameChange} type="text" placeholder="Enter your first name" />
        </div>
        <div className="input-box">
          <p>Last name</p>
          <input value={lastname} onChange={handleLastnameChange} type="text" placeholder="Enter your last name" />
        </div>
        <div className="input-box">
          <p>Email</p>
          <input value={email} onChange={handleEmailChange} type="email" placeholder="Enter your email" />
        </div>
        <div className="input-box">
          <p>Password</p>
          <input value={password} onChange={handlePasswordChange} type="password" placeholder="Enter your password" />
        </div>
        <div className="input-box">
          <p>Confrim password</p>
          <input value={confirmPassword} onChange={handleConfrimPasswordChange} type="password" placeholder="Confrim your password" />
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

        {/* sign up button */}
        <div>
          <button className={`btn ${isError || !isFormValid() ? 'signup-disabled-btn' : ''}`} disabled={isError || !isFormValid()}>
            Sign Up
          </button>
        </div>

        {/* proceed to login */}
        <div className="info-box">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
