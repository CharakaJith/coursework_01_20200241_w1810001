import './countryDisplay.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER } from '../../common/messages';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: apiUrl,
});

function CountryDisplay() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, [navigate]);

  // fetch countries
  const fetchCountries = () => {
    try {
      // validate access token
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        localStorage.setItem('signupMessage', USER.LOGGED_OUT);
        navigate('/login');

        return;
      }

      api
        .get('/api/v1/country', {
          headers: {
            Authorization: `"${accessToken}"`,
          },
        })
        .then((res) => {
          if (res.data.success === true) {
            setCountries(res.data.response.data.countries);
            setFilteredCountries(res.data.response.data.countries);
          }
        })
        .catch((error) => {
          console.error(`Error fetching countries: ${error.message}`);

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

  // handle search
  const handleSearch = () => {
    setFilteredCountries(
      countries.filter(
        (country) =>
          country.officialName.toLowerCase().includes(search.toLowerCase()) || country.commonName.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  // handle refresh
  const handleRefresh = () => {
    setSearch('');

    fetchCountries();
  };

  // handle enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // handle click
  const handleCountryClick = (country) => {
    navigate(`/country/${country.id}`);
  };

  return (
    <div className="country-display">
      {/* heading */}
      <div className="country-display-header">
        <h1>Countries ({filteredCountries.length})</h1>
      </div>

      {/* search bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by official name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        {/* search button */}
        <button
          type="button"
          className="search-btn"
          onClick={() => {
            handleSearch();
          }}
        >
          Search
        </button>

        {/* refresh button */}
        <button
          type="button"
          className="refresh-btn"
          onClick={() => {
            handleRefresh();
          }}
        >
          Refresh
        </button>
      </div>

      {/* country display table */}
      <div>
        {filteredCountries.length !== 0 ? (
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
                {filteredCountries.map((country, index) => (
                  <tr key={index} onClick={() => handleCountryClick(country)}>
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
        ) : (
          <p>No countries to show. Please try refreshing the page.</p>
        )}
      </div>
    </div>
  );
}

export default CountryDisplay;
