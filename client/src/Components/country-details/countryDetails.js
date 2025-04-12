import './countryDetails.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER } from '../../common/messages';

import close from '../../assets/icons/close.png';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: apiUrl,
});

function CountryDetails({ countryId }) {
  const [country, setCountry] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchCountry(countryId);
  }, [navigate]);

  // fetch country
  const fetchCountry = (countryId) => {
    try {
      // validate access token
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        localStorage.setItem('signupMessage', USER.LOGGED_OUT);
        navigate('/login');

        return;
      }

      api
        .get(`/api/v1/country/${countryId}`, {
          headers: {
            Authorization: `"${accessToken}"`,
          },
        })
        .then((res) => {
          if (res.data.success === true) {
            setCountry(res.data.response.data.country);
          }
        })
        .catch((error) => {
          console.error(`Error fetching country by id: ${error.message}`);

          // check if access token expired
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

  const handleClose = () => {
    navigate('/dashboard');
  };

  // render languages
  const renderLanguages = (languages) => {
    return languages ? Object.values(languages).join(', ') : 'N/A';
  };

  return (
    <div className="country-details">
      {/* close button */}
      <button className="close-button" onClick={() => handleClose()}>
        <img src={close} alt="Close" />
      </button>

      <div className="country-card">
        {/* left side */}
        <div className="country-info-side">
          <h1>{country.officialName}</h1>
          <h2>{country.commonName}</h2>
          <hr />
          <p>
            <strong>Capital:</strong> {country.capital || 'N/A'}
          </p>
          <p>
            <strong>Languages:</strong> {renderLanguages(country.languages)}
          </p>
          <p>
            <strong>Currency:</strong> {country.currency?.name} ({country.currency?.code}) {country.currency?.symbol}
          </p>
        </div>

        {/* right side */}
        <div className="country-flag-side">
          <img src={country.flagUrl} alt={`${country.commonName} flag`} />
        </div>
      </div>

      {/* wikipedia link */}
      <div className="country-footer-line">
        <strong>Read more: </strong>
        <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(country.officialName)}`} target="_blank" rel="noopener noreferrer">
          {country.commonName} on Wikipedia
        </a>
      </div>
    </div>
  );
}

export default CountryDetails;
