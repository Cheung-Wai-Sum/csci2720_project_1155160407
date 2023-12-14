const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// To enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with the specific origin(s) you want to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/csci2720project'); // put your own database link here
const Schema = mongoose.Schema;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
  console.log("Connection is open...");

  const EventSchema = mongoose.Schema({
    eventid: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    venue: {
      type: Schema.Types.ObjectId,
      ref: 'venues',
    },
    date:{
        type: Date,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    presenter:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
  });
  const VenueSchema = mongoose.Schema({
    vid: {
      type: Number,
      required: true,
      unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

  });
  // login
  const UserSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    permission: {
      type: String,
      required: true
    }
  });

  const CommentSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    venue: {
      type: Schema.Types.ObjectId,
      ref: 'venues',
    },
  });

  const FavouriteSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    venue: {
      type: Schema.Types.ObjectId,
      ref: 'venues',
    },
  });

  const User = mongoose.model("users", UserSchema);
  const Comment = mongoose.model("comments", CommentSchema);
  const Favourite = mongoose.model("favourite", FavouriteSchema);
  const Event = mongoose.model("events", EventSchema);
  const Venue = mongoose.model("venues", VenueSchema);

  // For Home page List , Show the Number of Event, Search Event less than $100
  app.get('/api/event', async (req, res) => {
    try {
      const events = await Event.find().populate('venue', 'vid location');
      
      if (events.length === 0) {
        res.status(404).send('No events found');
      } else {
        const formattedEvents = events.map(event => {
          return {
            eventid: event.eventid,
            title: event.title,
            venue: {
              vid: event.venue.vid,
              location: event.venue.location,
            },
            date: event.date,
            description: event.description,
            presenter: event.presenter,
            price: event.price,
            
          };
        });
        console.log(formattedEvents);
        res.status(200).json(formattedEvents);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  const escapeRegex = (string) => {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  //For search location
  app.get('/api/venue', async (req, res) => {
    try {
      const keyword = req.query.keyword;
      const escapedKeyword = escapeRegex(keyword);
      const venues = await Venue.find({
        location: { $regex: new RegExp(escapedKeyword, 'i') }, // Case-insensitive search
      });
  
      if (venues.length === 0) {
        res.status(404).send('No locations found');
      } else {
        const formattedVenues = venues.map((venue) => ({
          vid: venue.vid,
          location: venue.location,
        }));
        res.status(200).json(formattedVenues);
      }
    } catch (err) {
      console.error('Error retrieving venue data:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  // admin create new event
  app.post('/create', async (req, res) => {
    try {
        const eventTitle = req.body.eventTitle;
        const venueID = parseInt(req.body.venueID);
        const eventDate = req.body.eventDate;
        const eventDescription = req.body.eventDescription;
        const Presenter = req.body.Presenter;
        const Price = parseInt(req.body.Price);

  
      // Retrieve the maximum event ID from the database
      const maxEvent = await Event.findOne().sort({ eventid: -1 }).exec();
      let largestEventId = maxEvent ? maxEvent.eventid + 1 : 1;

      // Find the location data
      const venue = await Venue.findOne({ vid: venueID }).exec();

      if (!venue) {
        res.status(406).set('Content-Type', 'text/plain').send('Invalid location ID');
        return;
      }
  
      // Create a new event
      const newEvent = new Event({
        eventid: largestEventId,
        title: eventTitle,
        venue: venue,
        date: eventDate,
        description: eventDescription,
        presenter: Presenter,
        price: Price,
      });
      await newEvent.save();

      // respond to the user with the URL of the created event
      res.status(406).set('Content-Type', 'text/plain').send('Insert new Event successfully Event ID:' + largestEventId);
    } catch (error) {
      console.log('Error occurred while creating the event:', error);
      res.status(500).send('Failed to create event');
    }
  });

  // admin delete event
  app.post('/delete', async (req, res) => {
    try {
      const eventId = parseInt(req.body.eventID);
      const result = await Event.deleteOne({ eventid: eventId });
      console.log(result);
      if (result.deletedCount === 0) {
        res.status(500).send('Failed to delete event');
      } else {
        res.status(406).set('Content-Type', 'text/plain').send('Delete Event successfully Event ID:' + eventId);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  // admin update event
  app.post('/update', async (req, res) => {
    const eventId = req.body.eventID;
    const eventTitle = req.body.eventTitle;
    const venueId = req.body.venueID;
    const eventDate = req.body.eventDate;
    const eventDescription = req.body.eventDescription;
    const Presenter = req.body.Presenter;
    const Price = req.body.Price;
    let id;
    console.log(req.body);
    if (!eventId) {
      res.status(404).set('Content-Type', 'text/plain').send('"Event not found"');
      return;
    }
    Venue.findOne({vid: venueId})
    .then((data) => {
        id = data._id;

        Event
        .findOneAndUpdate({ eventid: {$eq: eventId} },
                        {$set: {
                           title: eventTitle,
                           date: eventDate,
                           description: eventDescription,
                           presenter: Presenter,
                           price: Price,
                           venue: id,
                           new: true,
                        },})
        .then((event) => {
          res.status(406).set('Content-Type', 'text/plain').send('Update Event successfully Event ID:' + eventId);
        })
        .catch((error) => {
          console.log('Failed to load your event:', error);
          res.status(500).set('Content-Type', 'text/plain').send('"Failed to load the event"');
        });
    })
    .catch((err) => {
        console.log(err);
    });

  });

  // Login request
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({username: username});

      if (user) {
        // If the username exists, compare the passwords
        if (user.password === password) {
          const permission = user.permission
          // If the passwords match, send a success response and the permission type
          return res.status(200).json({ success: true, message: 'Login successful', permission});
        } else {
          // If the passwords don't match, send an error response
          return res.status(401).json({ success: false, message: 'Invalid password' });
        }
      } else {
        // If the username doesn't exist, send an error response
        return res.status(401).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // admin create user
  app.post('/createuser', async (req, res) => {
    try {
      const username = req.body.username;
      const userpw = req.body.userpw;
      const userpermission = req.body.userpermission;

      const user = await User.findOne({ username: username }).exec();
  
      if (user) {
        user.password = userpw;
        user.permission = userpermission;
        await user.save();
      } else {
        // User does not exist, create a new user
        const newUser = new User({
          username: username,
          password: userpw,
          permission: userpermission,
        });
        await newUser.save();
      }
  
      res.status(200).send('User created/update successfully:' + username);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  // read user
  app.get('/api/read', async (req, res) => {
    try {
      // Assuming you have a User model/schema defined
      const users = await User.find().exec();
  
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  // delete user
  app.post('/deleteuser', async (req, res) => {
    try {
      const username = req.body.username;
  
      const user = await User.findOne({ username: username }).exec();
  
      if (!user) {
        res.status(404).send('User not found');
      } else {
        await User.deleteOne({ username: username });
        res.status(200).send('User deleted successfully: ' + username);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  //read comment
  app.get('/api/comment', async (req, res) => {
    try {
      const comments = await Comment.find().populate('venue', 'vid location');
      
      if (comments.length === 0) {
        res.status(404).send('No events found');
      } else {
        const formattedComments = comments.map(comment => {
          return {
            username: comment.username,
            comment: comment.comment,
            venue: {
              vid: comment.venue.vid,
              location: comment.venue.location,
            },
            
          };
        });
        console.log(formattedComments);
        res.status(200).json(formattedComments);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/addcomment', async (req, res) => {
    try {
      const userName = req.body.userName;
      const userComment = req.body.userComment;
      const locationID = req.body.locationID;

      const venue = await Venue.findOne({vid : locationID});
  
      // Assuming you have a Comment model/schema defined
      const newComment = new Comment({
        username: userName,
        comment: userComment,
        venue: venue._id,
      });
  
      await newComment.save();
  
      res.status(200).send('Comment added successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  //read favourite
  app.get('/api/favourite', async (req, res) => {
    try {
      const favourites = await Favourite.find().populate('venue', 'vid location');
      
      if (favourites.length === 0) {
        res.status(404).send('No events found');
      } else {
        const formattedFavourites = favourites.map(favourite => {
          return {
            username: favourite.username,
            venue: {
              vid: favourite.venue.vid,
              location: favourite.venue.location,
            },
            
          };
        });
        console.log(formattedFavourites);
        res.status(200).json(formattedFavourites);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  // add favourite
  app.post('/addfavourite', async (req, res) => {
    try {
      const userName = req.body.userName;
      const locationID = req.body.locationID;
      
      const venue = await Venue.findOne({vid : locationID});
      const newFavourite = new Favourite({
        username: userName,
        venue: venue._id,
      });
      console.log(venue);
  
      await newFavourite.save();
  
      res.status(200).send('Favourite Location added successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


  //End of DB
})
// listen to port 3000
const server = app.listen(3000);