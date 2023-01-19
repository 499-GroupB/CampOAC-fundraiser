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

// intialize reusable transporter for sending client invoices
/*let testAccount = nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
    port: PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
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
      let pdfName = item.lastName + "-" + item._id;
      pdf.create(invoiceTemplate(req.body), {}).toFile('./invoices/' + pdfName + '.pdf', (err) => {
        if (err) {
          return console.log('error creating invoice');
        }
      });

      //Email invoice pdf
      /*var mailOptions = {
        from: '"Fred Foo" <foo@example.com>',
        to: req.body.email,
        subject: 'Firewood Invoice',
        text: 'Thank you for your purchase! Please find your invoice attached',
        attachments: {filename: 'invoiceName.pdf', path: './invoiceName.pdf'},
      };
  
      let info = transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });*/

      // Update stock based on new order
      Location.findOneAndUpdate({ name: item.pickUp }, {$inc: {stock: -item.numBags}})
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
  if(req.body.username == testAdmin.username && req.body.password == testAdmin.password){
    console.log("User authenticated, sending token");
    // status 1 is logged in
    res.send({status: 1});
  }else{
    // status 0 is auth failure
    res.send({status: 0})
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
  Location.findOneAndUpdate({ _id: req.body.data.id }, {stock: req.body.data.stock})
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