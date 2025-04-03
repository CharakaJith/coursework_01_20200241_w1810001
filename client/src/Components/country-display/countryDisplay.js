import './countryDisplay.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: apiUrl,
});

function CountryDisplay() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, [navigate]);

  // fetch countries
  const fetchCountries = () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        localStorage.setItem('signupMessage', 'Oops! You must be logged in to proceed.');
        navigate('/login');
        return;
      }

      try {
        api
          .get('/api/v1/country', {
            headers: {
              Authorization: `"${accessToken}"`,
            },
          })
          .then((res) => {
            if (res.data.success === true) {
              setCountries(res.data.response.data.countries);
            }
          })
          .catch((error) => {
            console.error(`Error fetching countries: ${error.message}`);
          });
      } catch (error) {}
    } catch (error) {}
  };

  return (
    <div className="country-display">
      <div className="country-display-header">
        <h1>Countries</h1>
      </div>
      <div className="search-container">
        <input type="text" className="search-bar" placeholder="Search by official name" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="search-btn" onClick={() => setSearch(search)}>
          Search
        </button>
        <button className="refresh-btn" onClick={fetchCountries}>
          Refresh
        </button>
      </div>
      <div className="table-container">
        <table className="country-table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Official Name</th>
              <th>Common Name</th>
              <th>Capital</th>
              <th>Languages</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={index}>
                <td>
                  <img src={country.flagUrl} alt={country.commonName} width="70" />
                </td>
                <td>{country.officialName}</td>
                <td>{country.commonName}</td>
                <td>{country.capital}</td>
                <td>
                  {Object.values(country.languages).map((language, langIndex) => (
                    <div key={langIndex}>{language}</div>
                  ))}
                </td>

                <td>
                  {country.currency.name} <br /> {country.currency.code} ({country.currency.symbol})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CountryDisplay;
