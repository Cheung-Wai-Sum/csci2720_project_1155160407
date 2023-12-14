import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sorting = () => {
  const [eventTable, setEventTable] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = () => {
    axios
      .get('http://localhost:3000/api/event')
      .then((response) => {
        const sortedEvents = sortEvents(response.data);
        setEventTable(sortedEvents);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  };

  const sortEvents = (events) => {
    const sortedEvents = [...events];
    sortedEvents.sort((a, b) => {
      const countA = a.venue.events.length;
      const countB = b.venue.events.length;
      return sortAscending ? countA - countB : countB - countA;
    });
    return sortedEvents;
  };

  const handleSortClick = () => {
    setSortAscending(!sortAscending);
    const sortedEvents = sortEvents(eventTable);
    setEventTable(sortedEvents);
  };

  return (
    <>
      <h1>Home page</h1>
      <h2>List of Cultural Event</h2>
      <button onClick={handleSortClick}>
        Sort by Number of Events at Venue
      </button>
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

export default Sorting;