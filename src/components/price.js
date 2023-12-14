import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchPrice = () => {
  const [eventTable, setEventTable] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/event')
      .then((response) => {
        setEventTable(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  }, []);

  useEffect(() => {
    // Filter events based on price ≤ 100
    const filtered = eventTable.filter((event) => event.price <= 100);
    setFilteredEvents(filtered);
  }, [eventTable]);

  return (
    <>
      <h2 class = "bg-info">Cultural events whose price under ≤ $100</h2>
      <table className="event-table">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Title</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Description</th>
            <th>Presenter</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.eventid}>
              <td>{event.eventid}</td>
              <td>{event.title}</td>
              <td>{event.venue.location}</td>
              <td>{event.date}</td>
              <td>{event.description}</td>
              <td>{event.presenter}</td>
              <td>{event.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SearchPrice;