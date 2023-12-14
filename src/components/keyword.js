import React, { useState } from 'react';
import axios from 'axios';

const SearchKeyword = () => {
  const [keyword, setKeyword] = useState('');
  const [locationResults, setLocationResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    axios
      .get(`http://localhost:3000/api/venue?keyword=${keyword}`)
      .then((response) => {
        setLocationResults(response.data);
        setError('');
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
        setLocationResults([]);
        setError('No locations found');
      });
  };

  return (
    <>
      <h2>Search Locations by keywords in the name</h2>
      <input style={{ width: '400px' }}
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword"
      />
      <div></div>
      <button style={{ fontSize: '15px' }} onClick={handleSearch}>Search</button >

      {locationResults.length > 0 ? (
        <>
          <h3>Location Results</h3>
          <table className="location-table">
            <thead>
              <tr>
                <th>Venue ID</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {locationResults.map((location) => (
                <tr key={location.vid}>
                  <td>{location.vid}</td>
                  <td>{location.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        error && <p>{error}</p>
      )}
    </>
  );
};

export default SearchKeyword;