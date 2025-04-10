import './keyDisplay.css';
import { useState, useEffect } from 'react';
import { KEY } from '../../constants/key.constant';

import copy from '../../assets/icons/copy.png';

function KeyDisplay() {
  const [user, setUser] = useState({});
  const [apiKeys, setApiKeys] = useState([]);
  const [showFields, setShowFields] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userObject = storedUser ? JSON.parse(storedUser) : null;

    setUser(userObject);
  }, []);

  // handle generate
  const handleGenerate = () => {
    if (apiKeys.length < KEY.LENGTH) {
      const newApiKey = 'hello world';

      setApiKeys((prevKeys) => [...prevKeys, newApiKey]);
      setShowFields(true);
    }
  };

  // handle copy
  const handleCopy = (key) => {
    navigator.clipboard.writeText(key).catch((error) => {
      console.error(`Failed copying key: ${error.message}`);
    });
  };

  return (
    <div className="key-display">
      <div className="key-display-header">
        <h1>API Keys</h1>
        <h4>
          {user.firstName} {user.lastName}
        </h4>
      </div>
      <div className="instruction-box">
        <p>
          To get started with integrating our API, you can generate a unique API key below. This key will allow you to securely access our endpoints.
        </p>
        <p>
          <strong>Important:</strong>
        </p>
        <ul>
          <li>Keep your API key private. Do not share it publicly or store it in client-side code.</li>
          <li>You can generate a new key at any time if you need to revoke access or refresh your integration.</li>
          <li>If you lose your key, you can regenerate it here.</li>
        </ul>
      </div>
      <div className="key-box">
        <button className="btn" onClick={handleGenerate} disabled={apiKeys.length >= KEY.LENGTH}>
          Generate API Key
        </button>

        {showFields && apiKeys.length > 0 && (
          <div className="generated-api-keys">
            <ul>
              {apiKeys.map((key, index) => (
                <li key={index} className="api-key-item">
                  <div className="api-key-container">
                    <span className="api-key-field">{key}</span>
                    <button className="copy-btn" onClick={() => handleCopy(key)}>
                      <img src={copy} alt="Copy" className="btn-icon"></img>
                    </button>
                    <button className="revoke-btn">Revoke</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default KeyDisplay;
