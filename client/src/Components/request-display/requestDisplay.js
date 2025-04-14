import './requestDisplay.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER, MODAL } from '../../common/messages';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: apiUrl,
});

function RequestDisplay() {
  const [user, setUser] = useState({});
  const [logs, setLogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userObject = storedUser ? JSON.parse(storedUser) : null;

    setUser(userObject);
    fetchRequestLog();
  }, [navigate]);

  // fetch api request history
  const fetchRequestLog = () => {
    // validate access token
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      localStorage.setItem('signupMessage', USER.LOGGED_OUT);
      navigate('/login');

      return;
    }

    api
      .get('/api/v1/request', {
        headers: {
          Authorization: `"${accessToken}"`,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          setLogs(res.data.response.data.log);
        }
      })
      .catch((error) => {
        console.error(`Error fetching request history: ${error.message}`);

        // check if access token expire
        if (error.response.data.response.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');

          localStorage.setItem('signupMessage', USER.SESSION_EXP);
          navigate('/login');

          return;
        }
      });
  };

  return (
    <div className="request-display">
      {/* heading */}
      <div className="request-display-header">
        <h1>API Request Log</h1>
        <h4>
          {user.firstName} {user.lastName}
        </h4>
      </div>

      {/* request history log */}
      {logs.length > 0 ? (
        <div className="request-table-container">
          <table className="request-table">
            <thead>
              <tr>
                <th>API Key</th>
                <th>API Key Status</th>
                <th>Endpoint</th>
                <th>Endpoint Status</th>
                <th>timeStamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => {
                return (
                  <tr key={index}>
                    <td>{log.maskedKey}</td>
                    <td className={log.keyStatus === 'ACTIVE' ? 'status-success' : 'status-error'}>{log.keyStatus}</td>
                    <td>{log.endpoint}</td>
                    <td className={log.status === 200 ? 'req-success' : 'req-error'}>{log.status}</td>
                    <td>{new Date(log.timeStamp).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No request logs found.</p>
      )}
    </div>
  );
}

export default RequestDisplay;
