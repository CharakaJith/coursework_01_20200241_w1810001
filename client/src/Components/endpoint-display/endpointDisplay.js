import './endpointDisplay.css';
import InfoModal from '../../modals/info-modal/infoModal';
import { useState } from 'react';
import { MODAL } from '../../common/messages';

import copy from '../../assets/icons/copy-white.png';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function EndpointDisplay() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  // handle copy
  const handleCopy = (endpoint) => {
    navigator.clipboard
      .writeText(endpoint)
      .then(() => {
        setInfoMessage(MODAL.COPY.ENDPOINT);
        setInfoOpen(true);

        // close after 10 seconds
        setTimeout(() => setInfoOpen(false), 10000);
      })
      .catch((error) => {
        console.error(`Failed copying endpoint: ${error.message}`);
      });
  };

  return (
    <div className="endpoint-display">
      {/* heading */}
      <div className="endpoint-display-header">
        <h1>API Endpoints</h1>
      </div>

      {/* get all countries endpoint */}
      <div className="endpoint-box">
        <div className="side-by-side-boxes">
          {/* left box */}
          <div className="box-left">
            <h2>Retrieve all countries</h2>
            <p>
              Retrieves the details of a specific country, including information such as its name, population, currency, and region. The country is
              identified based on the provided country code or name. For a sample request, see Fetching country data by name or code.
            </p>
            <br />
            <br />

            <h3>Parameters</h3>
            <hr />
            <p>No parameters.</p>
            <br />
            <br />

            <h3>Returns</h3>
            <hr />
            <p>Returns a list of countries with details including names, capital, languages, flag, currency, and timestamps.</p>
          </div>

          {/* right box */}
          <div className="box-right">
            {/* request box */}
            <div className="request-box">
              <div className="request-content">
                <h5>
                  <span className="method">GET</span> {apiUrl}/api/v1/public/country
                </h5>
                <img
                  src={copy}
                  alt="Copy"
                  className="copy-icon"
                  onClick={() => {
                    handleCopy(`${apiUrl}/api/v1/public/country`);
                  }}
                />
              </div>
              <div className="curl-line">
                <p>
                  curl --location 'http://localhost:8000/api/v1/public/country' \
                  <br />
                  --header 'x-api-key: YOUR_API_KEY_HERE' \
                </p>
              </div>
            </div>

            {/* response box */}
            <div className="response-box">
              <div className="response-line">
                <h5>RESPONSE</h5>
              </div>
              <div className="data-line">
                <pre>
                  {`{
        "success": true,
        "response": {
                "status": 200,
                "data": {
                        "countries": [
                                {
                                        "id": 1,
                                        "officialName": "American Samoa",
                                        "commonName": "American Samoa",
                                        "commonName": "American Samoa",
                                        "languages": {
                                                "eng": "English",
                                                "smo": "Samoan"
                                        },
                                        "flagUrl": "https://flagcdn.com/as.svg",
                                        "createdAt": "2025-04-10T20:10:21.164Z",
                                        "updatedAt": "2025-04-10T20:10:21.164Z",
                                        "currency": {
                                                "id": 16,
                                                "name": "United States dollar",
                                                "code": "USD",
                                                "symbol": "$",
                                                "createdAt": "2025-04-10T20:10:18.216Z",
                                                "updatedAt": "2025-04-10T20:10:18.216Z"
                                        }
                                }
                        ]
                }
        }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* get country by id endpoint */}
        <div className="side-by-side-boxes">
          {/* left box */}
          <div className="box-left">
            <h2>Retrieve country by id</h2>
            <p>
              Retrieves detailed information for a specific country using its unique identifier (ID). The response includes data such as the country's
              name, population, currency, capital, and region. The country is identified based on the provided numeric ID. For a sample request, see
              Fetching country data by ID.
            </p>

            <br />
            <br />

            <h3>Parameters</h3>
            <hr />
            <p>
              <strong>id </strong>
              &nbsp;&nbsp;&nbsp; mandatory, numerical
            </p>
            <p>This specifies which country to get.</p>
            <br />
            <br />

            <h3>Returns</h3>
            <hr />
            <p>Returns details of a single country by ID, including names, capital, languages, flag, currency, and timestamps.</p>
          </div>

          {/* right box */}
          <div className="box-right">
            {/* request box */}
            <div className="request-box">
              <div className="request-content">
                <h5>
                  <span className="method">GET</span> {apiUrl}/api/v1/public/country/:id
                </h5>
                <img
                  src={copy}
                  alt="Copy"
                  className="copy-icon"
                  onClick={() => {
                    handleCopy(`${apiUrl}/api/v1/public/country/1`);
                  }}
                />
              </div>
              <div className="curl-line">
                <p>
                  curl --location 'http://localhost:8000/api/v1/public/country/1' \
                  <br />
                  --header 'x-api-key: YOUR_API_KEY_HERE' \
                </p>
              </div>
            </div>

            {/* response box */}
            <div className="response-box">
              <div className="response-line">
                <h5>RESPONSE</h5>
              </div>
              <div className="data-line">
                <pre>{`{
        "success": true,
        "response": {
                "status": 200,
                "data": {
                        "country": {
                                "id": 1,
                                "officialName": "American Samoa",
                                "commonName": "American Samoa",
                                "commonName": "American Samoa",
                                "languages": {
                                        "eng": "English",
                                        "smo": "Samoan"
                                },
                                "flagUrl": "https://flagcdn.com/as.svg",
                                "createdAt": "2025-04-10T20:10:21.164Z",
                                "updatedAt": "2025-04-10T20:10:21.164Z",
                                "currency": {
                                        "id": 16,
                                        "name": "United States dollar",
                                        "code": "USD",
                                        "symbol": "$",
                                        "createdAt": "2025-04-10T20:10:18.216Z",
                                        "updatedAt": "2025-04-10T20:10:18.216Z"
                                }
                        }
                }
        }                         
}`}</pre>
              </div>
            </div>
          </div>
        </div>

        <hr />
      </div>

      {/* info modal */}
      <InfoModal isOpen={infoOpen} message={infoMessage} onConfrim={() => setInfoOpen(false)} />
    </div>
  );
}

export default EndpointDisplay;
