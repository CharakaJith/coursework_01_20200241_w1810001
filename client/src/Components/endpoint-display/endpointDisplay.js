import './endpointDisplay.css';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function EndpointDisplay() {
  return (
    <div className="endpoint-display">
      {/* heading */}
      <div className="endpoint-display-header">
        <h1>API Endpoints</h1>
      </div>

      {/* endpoints */}
      <div className="endpoint-box">
        <div className="side-by-side-boxes">
          {/* left box */}
          <div className="box-left">
            <h2>Retrieve country details</h2>
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
            <p>Returns a country details object for the specified country, including name, population, currency, and region.</p>
          </div>

          {/* right box */}
          <div className="box-right">
            {/* request box */}
            <div className="request-box">
              <div className="request-line">
                <h5>
                  <span className="method">GET</span> {apiUrl}/api/v1/country
                </h5>
              </div>
              <div className="curl-line">
                <p>
                  curl --location 'http://localhost:8000/api/v1/country' \
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
                                        "id": 241,
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
      </div>
    </div>
  );
}

export default EndpointDisplay;
