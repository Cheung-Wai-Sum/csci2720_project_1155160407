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
    
    <h2 class="bg-info">Event Admin Dashboard</h2>
      <div className="border border-3 border-dark rounded">
        <h2>Create New Event</h2>
        <form id="create" action="http://localhost:3000/create" method="POST">
          <label htmlFor="eventTitle">Event Title:</label>
          <input className="form-control" type="text" id="eventTitle" name="eventTitle" required placeholder='Input text'/><br /><br />

          <label htmlFor="venueID">Venue ID:</label>
          <input className="form-control" type="number" id="venueID" name="venueID" required placeholder='Input number'/><br /><br />

          <label htmlFor="eventDate">Event Date:</label>
          <input className="form-control" type="string" id="eventDate" name="eventDate" required  placeholder='2023-12-26T20:00:00.000Z'/><br /><br />
          
          <label htmlFor="eventDescription">Event Description:</label>
          <input className="form-control" type="string" id="eventDescription" name="eventDescription" required placeholder='Input text'/><br /><br />
          
          <label htmlFor="Presenter">Presenter:</label>
          <input className="form-control" type="string" id="Presenter" name="Presenter" required placeholder='Input text'/><br /><br />

          <label htmlFor="Price">Event Price:</label>
          <input className="form-control" type="number" id="Price" name="Price" required placeholder='Input number'/><br /><br />

          <input class="btn btn-primary" type="submit" value="Create Event" />
        </form>
      </div>

      <div className="border border-3 border-dark rounded">
        <h2>Delete Event</h2>
        <form id="create" action="http://localhost:3000/delete" method="POST">

          <label htmlFor="eventID">Event ID:</label>
          <input className="form-control" type="number" id="eventID" name="eventID" required placeholder='Input Event ID'/><br /><br />

          <input class="btn btn-primary" type="submit" value="Delete Event" />
        </form>
      </div>

      <div className="border border-3 border-dark rounded">
        <h2>Update Event</h2>
        <form id="update" action="http://localhost:3000/update" method='POST'>

          <label htmlFor="eventID">Event ID: (You cannot edit this)</label>
          <input className="form-control" type="number" id="eventID" name="eventID" required placeholder='Input Event ID'/><br /><br />

          <label htmlFor="eventTitle">Event Title: (You can edit this)</label>
          <input className="form-control" type="text" id="eventTitle" name="eventTitle" required placeholder='Input text'/><br /><br />

          <label htmlFor="venueID">Venue ID: (You can edit this)</label>
          <input className="form-control" type="number" id="venueID" name="venueID" required placeholder='Input number'/><br /><br />

          <label htmlFor="eventDate">Event Date: (You can edit this)</label>
          <input className="form-control" type="string" id="eventDate" name="eventDate" required  placeholder='2023-12-26T20:00:00.000Z'/><br /><br />
          
          <label htmlFor="eventDescription">Event Description: (You can edit this)</label>
          <input className="form-control" type="string" id="eventDescription" name="eventDescription" required placeholder='Input text'/><br /><br />
          
          <label htmlFor="Presenter">Presenter: (You can edit this)</label>
          <input className="form-control" type="string" id="Presenter" name="Presenter" required placeholder='Input text'/><br /><br />

          <label htmlFor="Price">Event Price: (You can edit this)</label>
          <input className="form-control" type="number" id="Price" name="Price" required placeholder='Input number'/><br /><br />

          <input class="btn btn-primary" type="submit" value="Create Event" />

        </form>
      </div>

      
      <div className="border border-3 border-dark rounded">
      <h1 class="bg-info">User information Dashboard</h1>
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

      <div className="border border-3 border-dark rounded">
        <h2>Create New User or Update user password</h2>
        <p>(For update password, Enter existing username with new password)</p>
        <form id="createuser" action="http://localhost:3000/createuser" method="POST">

        <label htmlFor="username">User Name:</label>
        <input className="form-control" type="text" id="username" name="username" required placeholder='Input text'/><br /><br />

        <label htmlFor="userpw">User password:</label>
        <input className="form-control" type="text" id="userpw" name="userpw" required placeholder='Input text'/><br /><br />

        <label htmlFor="userpermission">User Permission: (admin or user)</label>
        <input className="form-control" type="text" id="userpermission" name="userpermission" required placeholder='Input text'/><br /><br />

        <input class="btn btn-primary" type="submit" value="Create New User" />
        </form>
      </div>

      <div className="border border-3 border-dark rounded">
        <h2>Delete User</h2>
        <form id="deleteuser" action="http://localhost:3000/deleteuser" method="POST">

        <label htmlFor="username">User Name:</label>
        <input className="form-control" type="text" id="username" name="username" required placeholder='Input text'/><br /><br />

        <input class="btn btn-primary" type="submit" value="Delete User" />
        </form>
      </div>



    </>
  );
};

export default Pannel;