import React, { useEffect, useState } from 'react';
import axios from 'axios';


const UserComment = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
      fetchComments();
    }, []);
  
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/comment');
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <>
    <h1>User Comment</h1>
      <div>
      <h1>Table</h1>
      <table className="event-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Comment</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment._id}>
              <td>{comment.username}</td>
              <td>{comment.comment}</td>
              <td>{comment.venue.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    <h2>Add New Comment</h2>
        <form id="add" action="http://localhost:3000/addcomment" method="POST">
          <label htmlFor="userName">Username:</label>
          <input type="text" id="userName" name="userName" required placeholder='Input text'/><br /><br />

          <label htmlFor="userComment">Comment:</label>
          <input type="text" id="userComment" name="userComment" required placeholder='Input text'/><br /><br />

          <label htmlFor="locationID">Location ID:</label>
          <input type="text" id="locationID" name="locationID" required placeholder='Input text'/><br /><br />

          <input type="submit" value="Add new Comment" />
        </form>


    </>
  );
};

export default UserComment;