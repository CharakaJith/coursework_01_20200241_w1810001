import './profileDisplay.css';
import axios from 'axios';
import EditModal from '../../modals/edit-modal/editModal';
import ConfirmModal from '../../modals/confrim-modal/confrimModal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER } from '../../common/messages';

import edit from '../../assets/icons/edit.png';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: apiUrl,
});

function ProfileDisplay() {
  const [user, setUser] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confrimTitle, setConfrimTitle] = useState('');
  const [confrimMessage, setConfrimMessage] = useState('');

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

  return (
    <div className="profile-display">
      <div className="country-display-header">
        <h1>Profile</h1>
        <h4>
          {user.firstName} {user.lastName}
        </h4>
      </div>

      <div className="profile-separator">
        <div className="profile-left">
          {/* personal details */}
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
        <div className="profile-right">
          {/* security details */}
          <div className="profile-header">
            <h3>Security details</h3>
          </div>
        </div>
      </div>

      {/* edit modal */}
      <EditModal isOpen={editOpen} onClose={() => setEditOpen(false)} onSubmit={confrimEdit} firstName={user.firstName} lastName={user.lastName} />
    </div>
  );
}

export default ProfileDisplay;
