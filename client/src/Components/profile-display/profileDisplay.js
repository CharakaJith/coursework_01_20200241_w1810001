import './profileDisplay.css';
import axios from 'axios';
import EditModal from '../../modals/edit-modal/editModal';
import ConfirmModal from '../../modals/confrim-modal/confrimModal';
import DeleteModal from '../../modals/delete-modal/deleteModal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MODAL, USER, VALIDATE } from '../../common/messages';

import edit from '../../assets/icons/edit.png';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: apiUrl,
});

function ProfileDisplay() {
  const [user, setUser] = useState({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confrimTitle, setConfrimTitle] = useState('');
  const [confrimMessage, setConfrimMessage] = useState('');
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userObject = storedUser ? JSON.parse(storedUser) : null;

    setUser(userObject);
  }, []);

  // confrim edit
  const handleEdit = () => {
    setEditOpen(true);
  };

  // handle edit
  const confrimEdit = (user) => {
    try {
      // validate access token
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        localStorage.setItem('signupMessage', USER.LOGGED_OUT);
        navigate('/login');

        return;
      }

      api
        .put('/api/v1/user', user, {
          headers: {
            Authorization: `"${accessToken}"`,
          },
        })
        .then((res) => {
          if (res.data.success === true) {
            localStorage.setItem('user', JSON.stringify(res.data.response.data.user));
            setUser(res.data.response.data.user);
          }
        })
        .catch((error) => {
          console.error(`Error updating user details: ${error.message}`);

          // check if access token expire
          if (error.response.data.response.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');

            localStorage.setItem('signupMessage', USER.SESSION_EXP);
            navigate('/login');

            return;
          }
        });

      setEditOpen(false);
    } catch (error) {}
  };

  // confrim delete
  const handleDelete = () => {
    setDeleteOpen(true);
  };

  // handle delete
  const confrimDelete = () => {
    // validate access token
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      localStorage.setItem('signupMessage', USER.LOGGED_OUT);
      navigate('/login');

      return;
    }

    api
      .delete('/api/v1/user', {
        headers: {
          Authorization: `"${accessToken}"`,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');

          navigate('/');
        }
      })
      .catch((error) => {
        console.error(`Error deactivating user: ${error.message}`);

        // check if access token expire
        if (error.response.data.response.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');

          localStorage.setItem('signupMessage', USER.SESSION_EXP);
          navigate('/login');

          return;
        } else if (error.response.data.response.status === 410) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');

          navigate('/');
        }
      });

    setDeleteOpen(false);
  };

  // validate form fields
  const isPasswordFormValid = () => {
    return currentPassword && newPassword && confirmPassword && newPassword === confirmPassword;
  };

  // handle current password on change
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);

    if (currentPassword) {
      setIsError(false);
    }
  };

  // handle new password on change
  const handleNewPasswordChange = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);

    // check confrim password is already filled
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

    if (newConfirmPassword !== newPassword) {
      setIsError(true);
      setError(VALIDATE.PASSWORD_MISMATCH);
    } else {
      setIsError(false);
      setError('');
    }
  };

  // confrim change password
  const handleChangePassword = (e) => {
    e.preventDefault();

    setConfrimTitle(MODAL.UPDATE.TITLE);
    setConfrimMessage(MODAL.UPDATE.MESSAGE);
    setConfirmOpen(true);

    // close after 1 minute
    setTimeout(() => {
      setConfirmOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 60000);
  };

  // change password
  const confrimChangePassword = () => {
    // validate access token
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      localStorage.setItem('signupMessage', USER.LOGGED_OUT);
      navigate('/login');
      return;
    }

    // request body
    const body = {
      oldPassword: currentPassword,
      newPassword: newPassword,
    };

    api
      .put('/api/v1/user/password', body, {
        headers: {
          Authorization: `"${accessToken}"`,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          if (res.data.response.status === 200) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            localStorage.setItem('signupMessage', USER.PASSWORD_CHANGED);
            navigate('/login');
          }
        }
      })
      .catch((error) => {
        console.error(`Error updating password: ${error.message}`);

        if (error.response.data.response.status === 401) {
          if (error.response.data.response.data.message === 'Current password is incorrect.') {
            setError(error.response.data.response.data.message);
            setIsError(true);
            setConfirmOpen(false);
          } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            localStorage.setItem('signupMessage', USER.SESSION_EXP);
            navigate('/login');
          }
        }
      });
  };

  // handle discard
  const handleDiscard = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setIsError(false);
    setError('');
  };

  return (
    <div className="profile-display">
      <div className="profile-display-header">
        <h1>Profile</h1>
        <h4>
          {user.firstName} {user.lastName}
        </h4>
      </div>

      <div className="profile-separator">
        {/* personal details */}
        <div className="profile-left">
          <div className="profile-header">
            <h3>Personal details</h3>
            <img
              src={edit}
              alt="Edit"
              className="edit-icon"
              onClick={() => {
                handleEdit();
              }}
            />
          </div>

          <table className="personal-table ">
            <tbody>
              <tr>
                <td>First Name</td>
                <td>{user.firstName}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{user.lastName}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{user.isActive ? 'Active' : 'Inactive'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* security details */}
        <div className="profile-right">
          <div className="profile-header">
            <h3>Change password</h3>
          </div>

          <div className="change-password-section">
            <form className="change-password-form" onSubmit={handleChangePassword}>
              <div className="password-input-row">
                <p>Current password</p>
                <input value={currentPassword} onChange={handleCurrentPasswordChange} type="password" placeholder="Enter your current password" />
              </div>
              <div className="password-input-row">
                <p>New password</p>
                <input value={newPassword} onChange={handleNewPasswordChange} type="password" placeholder="Enter your new password" />
              </div>
              <div className="password-input-row">
                <p>Confirm password</p>
                <input value={confirmPassword} onChange={handleConfrimPasswordChange} type="password" placeholder="Confrim your new password" />
              </div>

              {/* error box */}
              <>
                {isError ? (
                  <div className="password-error-box">
                    <text>{error}</text>
                  </div>
                ) : (
                  <></>
                )}
              </>

              {/* buttons */}
              <div className="password-form-buttons">
                <button
                  type="submit"
                  className={`btn ${isError || !isPasswordFormValid() ? 'disabled-btn' : ''}`}
                  disabled={isError || !isPasswordFormValid()}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="discard-btn"
                  onClick={() => {
                    handleDiscard();
                  }}
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
          <hr />

          {/* deactivate profile */}
          <div className="deactivate-section">
            <div className="profile-header">
              <h3>Deactivate account</h3>
            </div>

            <div className="deactivate-button-wrapper">
              <button
                type="button"
                className="deactivate-button"
                onClick={() => {
                  handleDelete();
                }}
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* edit modal */}
      <EditModal isOpen={editOpen} onClose={() => setEditOpen(false)} onConfirm={confrimEdit} firstName={user.firstName} lastName={user.lastName} />

      {/* confrim modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confrimChangePassword}
        title={confrimTitle}
        message={confrimMessage}
      />

      {/* delete modal */}
      <DeleteModal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={confrimDelete} email={user.email} />
    </div>
  );
}

export default ProfileDisplay;
