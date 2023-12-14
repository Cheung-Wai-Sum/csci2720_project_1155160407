import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Pannel = () => {
  return (
    <>
      <div>
        <h2>Create New Event</h2>
        <form id="create" action="http://localhost:3000/create" method="POST">
          <label htmlFor="eventTitle">Event Title:</label>
          <input type="text" id="eventTitle" name="eventTitle" required placeholder='Input text'/><br /><br />

          <label htmlFor="venueID">Venue ID:</label>
          <input type="number" id="venueID" name="venueID" required placeholder='Input number'/><br /><br />

          <label htmlFor="eventDate">Event Date:</label>
          <input type="string" id="eventDate" name="eventDate" required  placeholder='2023-12-26T20:00:00.000Z'/><br /><br />
          
          <label htmlFor="eventDescription">Event Description:</label>
          <input type="string" id="eventDescription" name="eventDescription" required placeholder='Input text'/><br /><br />
          
          <label htmlFor="Presenter">Presenter:</label>
          <input type="string" id="Presenter" name="Presenter" required placeholder='Input text'/><br /><br />

          <label htmlFor="Price">Event Price:</label>
          <input type="number" id="Price" name="Price" required placeholder='Input number'/><br /><br />

          <input type="submit" value="Create Event" />
        </form>
      </div>
      <div>
        <h2>Delete Event</h2>
        <form id="create" action="http://localhost:3000/delete" method="POST">

          <label htmlFor="eventID">Event ID:</label>
          <input type="number" id="eventID" name="eventID" required placeholder='Input Event ID'/><br /><br />

          <input type="submit" value="Delete Event" />
        </form>
      </div>
    </>
  );
};

export default Pannel;