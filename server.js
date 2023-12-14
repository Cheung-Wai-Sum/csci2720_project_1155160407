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
      res.status(406).set('Content-Type', 'text/plain').send('Insert new Event successfully Event ID' + largestEventId);
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
        res.status(406).set('Content-Type', 'text/plain').send('Delete Event successfully Event ID' + eventId);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  //End of DB
})
// listen to port 3000
const server = app.listen(3000);