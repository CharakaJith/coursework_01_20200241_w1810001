import axios from 'axios';
import './SignupForm.css';
import { useState, useEffect } from 'react';

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

  useEffect(() => {}, []);

  // validate form fields
  const isFormValid = () => {
    return firstname && lastname && email && password && confirmPassword && password === confirmPassword;
  };

  // submit form
  const submitForm = (event) => {};

  // handle first name on change
  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);

    if (firstname) {
      setIsError(false);
    } else {
    }
  };

  // handle last name on change
  const handleLastnameChange = (event) => {
    setLastname(event.target.value);

    if (lastname) {
      setIsError(false);
    } else {
    }
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
    const newPassword = event.target.value;
    setPassword(newPassword);

    // check if confirmPassword is already filled
    if (confirmPassword && newPassword !== confirmPassword) {
      setIsError(true);
      setError('Passwords do not match!');
    } else {
      setIsError(false);
      setError('');
    }
  };

  // handle confrim password on change
  const handleConfrimPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setIsError(true);
      setError('Passwords do not match!');
    } else {
      setIsError(false);
      setError('');
    }
  };

  return (
    <div className="form-wrapper">
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
          <button className={`btn ${isError || !isFormValid() ? 'disabled-btn' : ''}`} disabled={isError || !isFormValid()}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
