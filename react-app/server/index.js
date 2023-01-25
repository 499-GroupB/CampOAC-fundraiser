// global npm requirements
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require('mongoose');

const pdf = require('html-pdf');

const nodemailer = require("nodemailer");

// local requisites
const Order = require('./models/order');
const Location = require('./models/location');
const auth = require('./credentials');

const invoiceTemplate = require('./models/invoiceTemplate');

// conf
const PORT = 3000;

// Database configuration
// Initalize mongoDB connection string for MongoDB Atlas
const mongoDB = "mongodb+srv://" + auth + "@wooddb.m6hauwo.mongodb.net/?retryWrites=true&w=majority";

// Use mongoose to connect to the URL and pass parameters
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// initialize connection and log error message if anything goes wrong
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//SMS Auth Info
//var TWILIO_ACCOUNT_SID = ;
//var TWILIO_AUTH_TOKEN = ;

/*const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15017122661',
     to: '+15558675310'
   })
  .then(message => console.log(message.sid));*/

// intialize reusable transporter for sending client invoices
/*const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "capstone499.groupb@gmail.com",
      clientId: TODO,
      clientSecret: TODO,
      refreshToken: TODO,
      accessToken: TODO,
      expires: TODO,

    },
});*/

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

      //Create invoice pdf
      let pdfName = item.lastName + "-" + item._id + ".pdf";
      pdf.create(invoiceTemplate(req.body), {}).toFile(__dirname + '/invoices/' + pdfName, (err) => {
        if (err) {
          return console.log('error creating invoice');
        }
      });

      //Email invoice pdf
      /*var mailOptions = {
        from: '"OACGroupB" <capstone499.groupb@gmail.com>',
        to: req.body.email,
        subject: 'Firewood Invoice',
        text: 'Thank you for your purchase! Please find your invoice attached',
        attachments: {filename: pdfName, path: __dirname + '/invoices/' + pdfName},
      };
  
      let info = transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });*/

      // Update stock based on new order
      Location.findOneAndUpdate({ name: item.pickUp }, { $inc: { stock: -item.numBags } })
        .then(() => {
          console.log("succesfully updated stock to reflect new order");
        })
        .catch(err => {
          console.log("undable to modify stock on location")
        });

      // return new order id
      res.status(200).send(newOrder._id);
    })
    // If something goes wrong (Code 400)
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

// Login Authentication
// POST API endpoint
app.post("/login/auth", (req, res) => {

  // Test admin user
  // To be replaced with user database later
  const testAdmin = {
    username: 'admin',
    password: 't3st1ng'
  }

  // Display response to console
  console.log("Recieved login request: ");

  // Output details of request
  console.log(req.body);

  // authentication (if you can call it that)
  if (req.body.username == testAdmin.username && req.body.password == testAdmin.password) {
    console.log("User authenticated, sending token");
    // status 1 is logged in
    res.send({ status: 1 });
  } else {
    // status 0 is auth failure
    res.send({ status: 0 })
  }
});

// Order deletion
// POST API endpoint
app.post("/order/delete", (req, res) => {
  // return all orders
  console.log("Recieved order to delete");
  console.log(req.body);
  Order.deleteOne({ _id: req.body.data })
    .then(() => {
      console.log("succesfully deleted order");
      res.status(200).send("Succesfully deleted from database");
    })
    .catch(err => {
      res.status(400).send("Unable to delete from database");
    });
});

// POST API endpoint
app.post("/location/modify", (req, res) => {
  // return all orders
  console.log("Recieved location to modify");
  console.log(req.body);
  Location.findOneAndUpdate({ _id: req.body.data.id }, { stock: req.body.data.stock })
    .then(() => {
      console.log("succesfully found order");
      res.status(200).send("Succesfully modified from database");
    })
    .catch(err => {
      res.status(400).send("Unable to modify location");
    });
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

// retrieve order by orderID
app.get("/order/single", (req, res) => {
  // return single orders
  console.log("Recieved order to retrieve");
  console.log(req.body);
  Order.findOne({ _id: req.body.data })
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      res.status(400).send("Unable to find order:" + req.body.data);
    });
})

app.get("/location/list", (req, res) => {
  // return all orders
  console.log("Someone is accessing location records")
  Location.find()
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
