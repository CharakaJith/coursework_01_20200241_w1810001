import './keyDisplay.css';
import axios from 'axios';
import ConfirmModal from '../../modals/confrim-modal/confrimModal';
import InfoModal from '../../modals/info-modal/infoModal';
import { useState, useEffect } from 'react';
import { KEY } from '../../constants/key.constant';
import { useNavigate } from 'react-router-dom';
import { USER, MODAL } from '../../common/messages';

import copy from '../../assets/icons/copy.png';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: apiUrl,
});

function KeyDisplay() {
  const [user, setUser] = useState({});
  const [apiKeys, setApiKeys] = useState([]);
  const [showFields, setShowFields] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedKeyId, setSelectedKeyId] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userObject = storedUser ? JSON.parse(storedUser) : null;

    setUser(userObject);
    fetchApiKeys();
  }, [navigate]);

  // fetch api keys
  const fetchApiKeys = () => {
    try {
      // validate access token
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        localStorage.setItem('signupMessage', USER.LOGGED_OUT);
        navigate('/login');

        return;
      }

      api
        .get('/api/v1/key', {
          headers: {
            Authorization: `"${accessToken}"`,
          },
        })
        .then((res) => {
          if (res.data.success === true) {
            setApiKeys(res.data.response.data.apiKeys);
            setShowFields(true);
          }
        })
        .catch((error) => {
          console.error(`Error fetching API keys: ${error.message}`);

          // check if access token expire
          if (error.response.data.response.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');

            localStorage.setItem('signupMessage', USER.SESSION_EXP);
            navigate('/login');

            return;
          }
        });
    } catch (error) {}
  };

  // generate api key
  const handleGenerate = () => {
    if (apiKeys.length < KEY.LENGTH) {
      try {
        // validate access token
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          localStorage.setItem('signupMessage', USER.LOGGED_OUT);
          navigate('/login');

          return;
        }

        api
          .post(
            '/api/v1/key',
            {},
            {
              headers: {
                Authorization: `"${accessToken}"`,
              },
            }
          )
          .then((res) => {
            if (res.data.success === true) {
              const newApiKey = res.data.response.data.apiKey;

              setApiKeys((prevKeys) => [...prevKeys, newApiKey]);
              setShowFields(true);
            }
          })
          .catch((error) => {
            console.error(`Error generating new API key: ${error.message}`);

            // check if access token expire
            if (error.response.data.response.status === 401) {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('user');

              localStorage.setItem('signupMessage', USER.SESSION_EXP);
              navigate('/login');

              return;
            }
          });
      } catch (error) {}
    }
  };

  // confrim api key revoke
  const handleRevoke = (keyId) => {
    setSelectedKeyId(keyId);
    setModalTitle(MODAL.REVOKE.TITLE);
    setModalMessage(MODAL.REVOKE.MESSAGE);
    setConfirmOpen(true);

    // close after 1 minute
    setTimeout(() => setConfirmOpen(false), 60000);
  };

  // revoke api key
  const confirmRevoke = () => {
    // validate access token
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      localStorage.setItem('signupMessage', USER.LOGGED_OUT);
      navigate('/login');
      return;
    }

    api
      .delete(`/api/v1/key/${selectedKeyId}`, {
        headers: {
          Authorization: `"${accessToken}"`,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          setApiKeys((prevKeys) => prevKeys.filter((key) => key.id !== selectedKeyId));
          setConfirmOpen(false);
        }
      })
      .catch((error) => {
        console.error(`Error revoking API key: ${error.message}`);

        // check if access token expire
        if (error.response.data.response.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          localStorage.setItem('signupMessage', USER.SESSION_EXP);
          navigate('/login');
        }
      });
  };

  // handle copy
  const handleCopy = (key) => {
    navigator.clipboard
      .writeText(key)
      .then(() => {
        setInfoMessage(MODAL.COPY.MESSAGE);
        setInfoOpen(true);

        // close after 10 seconds
        setTimeout(() => setInfoOpen(false), 10000);
      })
      .catch((error) => {
        console.error(`Failed copying key: ${error.message}`);
      });
  };

  return (
    <div className="key-display">
      {/* heading */}
      <div className="key-display-header">
        <h1>API Keys</h1>
        <h4>
          {user.firstName} {user.lastName}
        </h4>
      </div>

      {/* instruction display box */}
      <div className="instruction-box">
        <p>
          To get started with integrating our API, you can generate a unique API key below. This key will allow you to securely access our endpoints.
        </p>
        <p>
          <strong>Important:</strong>
        </p>
        <ul>
          <li>
            You can have a maximum of <strong>2 active API keys</strong> at a time.
          </li>
          <li>
            Each API key is valid for <strong>30 days</strong> from the date of generation.
          </li>
          <li>Keep your API key private. Do not share it publicly or store it in client-side code.</li>
          <li>You can revoke a key and generate a new one at any time, as long as you're within the 3-key limit.</li>
          <li>If you lose your key, you can revoke and regenerate it here.</li>
        </ul>
      </div>

      {/* key generate box */}
      <div className="key-box">
        {/* generate button */}
        <button
          type="button"
          className="btn"
          onClick={() => {
            handleGenerate();
          }}
          disabled={apiKeys.length >= KEY.LENGTH}
        >
          Generate API Key
        </button>

        {/* api key display */}
        {showFields && apiKeys.length > 0 && (
          <div className="generated-api-keys">
            <ul>
              {apiKeys.map((key, index) => (
                <li key={index} className="api-key-item">
                  <div className="api-key-container">
                    <span className="api-key-field">{key.apiKey}</span>
                    <span className="api-key-expiry">
                      Expires in {Math.ceil((new Date(key.expiresAt) - new Date()) / (1000 * 60 * 60 * 24))} days
                    </span>

                    {/* copy button */}
                    <button type="button" className="copy-btn" onClick={() => handleCopy(key.apiKey)}>
                      <img src={copy} alt="Copy" className="btn-icon"></img>
                    </button>

                    {/* revoke button */}
                    <button type="button" className="revoke-btn" onClick={() => handleRevoke(key.id)}>
                      Revoke
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* confirm modal */}
      <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={confirmRevoke} title={modalTitle} message={modalMessage} />

      {/* info modal */}
      <InfoModal isOpen={infoOpen} message={infoMessage} onConfrim={() => setInfoOpen(false)} />
    </div>
  );
}

export default KeyDisplay;
