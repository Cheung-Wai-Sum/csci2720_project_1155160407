How to run our Project Locally using React and MongoDB

Step 1 Download the submitted  zip file and unzip

Step 2 Run npm install inside the folder of csci2720_project
The required module includes:
@react-google-maps/api
axios
bootstrap
express
mongoose
react
react-router-dom
react-dom

You can check with the package.json file with the dependencies,

Step 3 Open MongoDB Compass
Configure mongodb://localhost:27017
Connect to the MongoDB
Add a database named “csci2720project”

Run node server.js in another terminal to add the collection “comments”, ”events”, ”favourite”, ”users”, ”venues” should be created

Step 4 Import the json file to the corresponding collection:
The dataset of collections are inside the folder of database_setup.
First download the json file:
csci2720project.comments.json -> import to collection ”comments”
csci2720project.events.json -> import to collection ” events”
csci2720project.favourites.json -> import to collection “favourites”
csci2720project.users.json -> import to collection ”users”
csci2720project.venues.json -> import to collection ”venues”

Step 5 Run node server.js and npm start in separate terminal to see the




