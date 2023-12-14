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
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    presenter: {
      type: String,
      required: true,
    },
    price: {
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

  const User = mongoose.model("users", UserSchema);
  const Event = mongoose.model("events", EventSchema);
  const Venue = mongoose.model("venues", VenueSchema);

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

  app.get('/api/venue', async (req, res) => {
    try {
      const keyword = req.query.keyword;
      const venues = await Venue.find({
        location: { $regex: new RegExp(keyword, 'i') }, // Case-insensitive search
      });

      if (venues.length === 0) {
        res.status(404).send('No locations found');
      } else {
        const formattedVenues = venues.map((venue) => {
          return {
            vid: venue.vid,
            location: venue.location,
          };
        });
        res.status(200).json(formattedVenues);
      }
    } catch (err) {
      console.error('Error retrieving venue data:', err);
      res.status(500).send('Internal Server Error');
    }
  });

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

  //End of DB
})
// listen to port 3000
const server = app.listen(3000);