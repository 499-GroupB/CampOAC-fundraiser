// global npm requirements
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require('mongoose');

// local requisites
const Order = require('./models/order');
const auth = require('./credentials');
const Invoice = require('./invoicing');

// conf
const PORT = 3000;

// Database configuration
// Initalize mongoDB connection string for MongoDB Atlas
const mongoDB = "mongodb+srv://"+auth+"@wooddb.sibodbb.mongodb.net/?retryWrites=true&w=majority";

// Use mongoose to connect to the URL and pass parameters
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});

// initialize connection and log error message if anything goes wrong
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Express Middleware
// Use JSON to be able to parse POST requests from form submissions
// e.g: OrderForm or AdminForm
app.use(express.json())

// Order submission
// POST API endpoint
app.post("/order/submit", (req, res) => {
  // Display response to console
  console.log("Recieved Order: ");
  console.log(req.body);
  // Save recieved order to Mongo via Model Order (./models/order)
  var newOrder = new Order(req.body);
  newOrder.save()

  // If succesful (Code 200))
  .then(item => {
    res.status(200).send("New order saved to database");
    
    //placed function here so invoice is only genrated on successful order
    Invoice.genInvoice(req.body); //tied in for now, eventually probably makes more sense to make genInvoice call from inside emailInvoice function
    //TODO Invoice.emailInvoice(req.body)
  }) 
  // If something goes wrong (Code 400)
  .catch(err => {
    res.status(400).send("Unable to save to database");
  });
});

// Login Authentication
// POST API endpoint
app.post("/login/auth", (req, res) => {
  // Display response to console
  console.log("Recieved login request: ");
  // Do something
  console.log(req.body);
  // This does nothing.
  res.send({
    token: '123',
  })
});

// Order deletion
// POST API endpoint
app.post("/order/delete", (req, res) => {
  // Display response to console
  console.log("Recieved Order to delete: ");
  // Do something
  console.log(req.body);
});

// Order retrieval
// GET API endpoint
app.get("/order/list", (req, res) => {
  // return all orders
  console.log("Someone is accessing order records")
  Order.find()
  .then(data => {
    console.log(data);
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(400).send("Unable to retrieve from database");
  });
})

// Express Middleware
// Use Static to serve the build directory which is generated
// through create-react-apps build script
// General GET requests will go to this point and will cause express to serve files
app.use(express.static(path.join(__dirname, "..", "build")));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 3000
app.listen(PORT, () => {
  // Display confirmation that server is running
  console.log("SERVER RUNNING ON PORT " + PORT);
});