import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Table = () => {
  const [eventTable, setEventTable] = useState([]);

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

  return (
    <>
    <h1>
      Home page
    </h1>
    <h2>
      List of Event
    </h2>
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
        {eventTable.map((event) => (
          <tr key={event.eventid}>
            <td>{event.eventid}</td>
            <td>{event.title}</td>
            <td>{event.venue.location}</td> {/* Accessing location property of venue */}
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

export default Table;