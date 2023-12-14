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
      const venues = await Venue.find();
      res.json("123" + venues);
      console.log(venues);
    } catch (err) {
      console.error('Error retrieving venue data:', err);
      res.status(500).send('Internal Server Error');
    }
  });


  //End of DB
})
// listen to port 3000
const server = app.listen(3000);