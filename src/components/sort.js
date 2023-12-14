import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sorting = () => {
  const [locationTable, setLocationTable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [venueResponse, eventResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/venue', {
            params: {
              keyword: '', // Add any keyword for filtering if needed
            },
          }),
          axios.get('http://localhost:3000/api/event'),
        ]);

        const eventCounts = {};
        eventResponse.data.forEach((event) => {
          const location = event.venue?.location || 'Unknown';
          eventCounts[location] = (eventCounts[location] || 0) + 1;
        });

        const updatedLocationTable = venueResponse.data.map((location) => ({
          ...location,
          numEvents: eventCounts[location.location] || 0,
        }));

        setLocationTable(updatedLocationTable);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const refreshInterval = setInterval(fetchData, 60000); // Refresh data every 60 seconds

    return () => {
      clearInterval(refreshInterval); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <>
      <h1></h1>
      <h2>Number of Events at a venue</h2>
      <table className="location-table">
        <thead>
          <tr>
            <th>Location ID</th>
            <th>Location Name</th>
            <th>Number of Events</th>
          </tr>
        </thead>
        <tbody>
          {locationTable.map((location) => (
            <tr key={location.vid}>
              <td>{location.vid}</td>
              <td>{location.location}</td>
              <td>{location.numEvents}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Sorting;