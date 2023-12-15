import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Userfavourite = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
      fetchFavourites();
    }, []);
  
    const fetchFavourites = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/favourite');
        setFavourites(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <>
    <h1>User Favourite Locations</h1>
      <div>
      <table className="event-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Venue</th>
            <th>Location ID</th>
          </tr>
        </thead>
        <tbody>
          {favourites.map((favourite) => (
            <tr key={favourite._id}>
              <td>{favourite.username}</td>
              <td>{favourite.venue.location}</td>
              <td>{favourite.venue.vid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="border border-3 border-dark rounded">
    <h2>Add New Favourite Location</h2>
        <form id="favouriteadd" action="http://localhost:3000/addfavourite" method="POST">
          <label htmlFor="userName">Username:</label>
          <input className="form-control" type="text" id="userName" name="userName" required placeholder='Input text'/><br /><br />

          <label htmlFor="locationID">Location ID:</label>
          <input className="form-control" type="number" id="locationID" name="locationID" required placeholder='Input text'/><br /><br />

          <input class="btn btn-primary" type="submit" value="Add new Favourite Location" />
        </form>

    </div>
    </>
  );
};

export default Userfavourite;