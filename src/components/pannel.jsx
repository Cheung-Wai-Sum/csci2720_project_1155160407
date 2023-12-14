import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Pannel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/read');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
    
    
  return (
    <>
    
    <h1>Event(CRUD)</h1>
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

      <div>
        <h2>Update Event</h2>
        <form id="update" action="http://localhost:3000/update" method='POST'>

          <label htmlFor="eventID">Event ID: (You cannot edit this)</label>
          <input type="number" id="eventID" name="eventID" required placeholder='Input Event ID'/><br /><br />

          <label htmlFor="eventTitle">Event Title: (You can edit this)</label>
          <input type="text" id="eventTitle" name="eventTitle" required placeholder='Input text'/><br /><br />

          <label htmlFor="venueID">Venue ID: (You can edit this)</label>
          <input type="number" id="venueID" name="venueID" required placeholder='Input number'/><br /><br />

          <label htmlFor="eventDate">Event Date: (You can edit this)</label>
          <input type="string" id="eventDate" name="eventDate" required  placeholder='2023-12-26T20:00:00.000Z'/><br /><br />
          
          <label htmlFor="eventDescription">Event Description: (You can edit this)</label>
          <input type="string" id="eventDescription" name="eventDescription" required placeholder='Input text'/><br /><br />
          
          <label htmlFor="Presenter">Presenter: (You can edit this)</label>
          <input type="string" id="Presenter" name="Presenter" required placeholder='Input text'/><br /><br />

          <label htmlFor="Price">Event Price: (You can edit this)</label>
          <input type="number" id="Price" name="Price" required placeholder='Input number'/><br /><br />

          <input type="submit" value="Create Event" />

        </form>
      </div>

      <h1>User information(CRUD)</h1>
      <div>
      <table className="event-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Permission</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.permission}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      <div>
        <h2>Create New User or Update user password</h2>
        <p>(For update password, Enter existing username with new pw)</p>
        <form id="createuser" action="http://localhost:3000/createuser" method="POST">

        <label htmlFor="username">User Name:</label>
        <input type="text" id="username" name="username" required placeholder='Input text'/><br /><br />

        <label htmlFor="userpw">User password:</label>
        <input type="text" id="userpw" name="userpw" required placeholder='Input text'/><br /><br />

        <label htmlFor="userpermission">User Permission: (admin or user)</label>
        <input type="text" id="userpermission" name="userpermission" required placeholder='Input text'/><br /><br />

        <input type="submit" value="Create New User" />
        </form>
      </div>

      <div>
        <h2>Delete User</h2>
        <form id="deleteuser" action="http://localhost:3000/deleteuser" method="POST">

        <label htmlFor="username">User Name:</label>
        <input type="text" id="username" name="username" required placeholder='Input text'/><br /><br />

        <input type="submit" value="Delete User" />
        </form>
      </div>



    </>
  );
};

export default Pannel;