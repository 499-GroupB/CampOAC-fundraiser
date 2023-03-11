// global npm requirements
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require('mongoose');

const { Client, Environment } = require("square");
const uuidv4 = require('uuid4');

const pdf = require('html-pdf');

const nodemailer = require("nodemailer");

// local requisites
const Order = require('./models/order');
const Location = require('./models/location');
const Admin = require('./models/admin');
const auth = require('./credentials');
//const smsAuth = require('./smsCredentials');
//const emailAuth = require('./emailCredentials');


const invoiceTemplate = require('./models/invoiceTemplate');
const smsTemplate = require('./models/smsInvoice');

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
//var TWILIO_ACCOUNT_SID = smsAuth.twilSID;
//var TWILIO_AUTH_TOKEN = smsAuth.twilTok;

/*const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);*/



// intialize reusable transporter for sending client invoices
/*const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "capstone499.groupb@gmail.com",
      clientId: emailAuth.gmailClientID,
      clientSecret: emailAuth.gmailClientSecret,
      refreshToken: emailAuth.gmailRefresh,
      accessToken: emailAuth.gmailAccess,
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
      if (req.body.sms == 'isSMS') {
        /*client.messages
          .create({
          body: smsTemplate(item),
          from: +16693483413,
          to: req.body.phone,
        })
        .then(message => console.log(message.sid));*/
      }
      //Create invoice pdf
      else {
        let pdfName = item.lastName + "-" + item._id + ".pdf";
        pdf.create(invoiceTemplate(item), {}).toFile(__dirname + '/invoices/' + pdfName, (err) => {
          if (err) {
            return console.log('error creating invoice');
          }
        });
      }

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
          // Location.findOne({ name: item,pickUp}, "stock", (err, stock) =>{
          //   if (err) return handleError(err);
          //   if(stock.toObject()<=10){
          //     Admin.find("phone", (err, phones) =>{
          //       if (err) return handleError(err);
          //       for(phone in phones){
          //         client.messages.create({
          //           body: `Low stock alert. Only ${stock} bags remain at ${item.pickUp}`,
          //           from: +16693483413,
          //           to: phone.toObject(),
          //         })
          //         .then(message => console.log(message.sid));
          //       };
          //     });
          //   };
          // });
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
  /*const testAdmin = {
    username: 'admin',
    password: 't3st1ng'
  }*/

  // Display response to console
  console.log("Recieved login request: ");

  // Output details of request
  console.log(req.body);

  Admin.findOne({ email: req.body.email }).exec((err, admin) => {
    if (err) {
      res.send({ status: -1 }) // status -1 for failure
    }

    if (admin) {
      if (admin.password == req.body.password) {
        if (admin.isSuper) {
          res.send({ status: 1, user: admin })
          console.log("logged in as super user");
        } else {
          res.send({ status: 2, user: admin }) // status 2 for login
        }
      } else {
        res.send({ status: -1 }) // status -1 for failure
      }
    } else {
      res.send({ status: -1 })
    }
  })

  // authentication (if you can call it that)
  /*if (req.body.email == testAdmin.username && req.body.password == testAdmin.password) {
    console.log("User authenticated, sending token");
    // status 1 is logged in
    res.send({ status: 1 });
  } else {
    // status -1 is auth failure
    res.send({ status: -1 })
  }*/
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
  Location.findOneAndUpdate({ _id: req.body.data.id }, { stock: req.body.data.stock, contact: req.body.data.contact, adminId: req.body.data.adminId })
    .then(() => {
      console.log("succesfully found location");
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
      console.log("Data sent.")
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send("Unable to retrieve from database");
    });
})

// retrieve order by orderID
app.post("/order/single", (req, res) => {
  // return single orders
  console.log("Recieved order to retrieve");
  let orderId = req.body.orderId
  console.log(orderId);
  Order.findOne({ _id: orderId }).exec((err, order) => {
    if (err) {
      console.log("error finding order " + orderId)
      res.status(400).send("Unable to retrieve order");
    } else {
      // check to verify email is correct
      if (req.body.email == order.email) {
        console.log(order);
        res.status(200).send(order);
      } else {
        console.log("Email did not match orderid entered")
        res.status(400).send("Unable to verify order");
      }
    }
  })
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

// return location from id
app.post("/location/single", (req, res) => {
  // return single location
  let locationId = req.body.locationId
  console.log(locationId);
  Location.findOne({ _id: locationId }).exec((err, location) => {
    if (err) {
      console.log("error finding location " + locationId)
      res.status(400).send("Unable to retrieve location");
    } else {
      console.log(location);
      res.status(200).send(location);
    }
  })
})

// Location add
// POST API endpoint
app.post("/location/add", (req, res) => {
  // Display response to console
  console.log("Recieved Location: ");
  console.log(req.body.locationData);
  // Save recieved location to Mongo via Location Order (./models/location)
  var newLocation = new Location(req.body.locationData);
  newLocation.save()
    // If succesful (Code 200))
    .then(item => {
      // return new order id
      res.status(200).send(newLocation._id);
    })
    // If something goes wrong (Code 400)
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

// Location deletion
// POST API endpoint
app.post("/location/delete", (req, res) => {
  // return all orders
  console.log("Recieved location to delete");
  console.log(req.body);
  Location.deleteOne({ _id: req.body.data })
    .then(() => {
      console.log("succesfully deleted location");
      res.status(200).send("Succesfully deleted from database");
    })
    .catch(err => {
      res.status(400).send("Unable to delete from database");
    });
});

// Admin API
app.get("/admin/list", (req, res) => {
  console.log("Someone is accessing location records")
  Admin.find()
    .then(data => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send("Unable to retrieve from database");
    });
})

// Admin add
// POST API endpoint
app.post("/admin/add", (req, res) => {
  // Display response to console
  console.log("Recieved User to create: ");
  console.log(req.body.adminData);
  // Save recieved admin to Mongo via admin Order (./models/admin)
  var newAdmin = new Admin(req.body.adminData);
  newAdmin.save()
    // If succesful (Code 200))
    .then(item => {
      // return new order id
      res.status(200).send(newAdmin._id);
    })
    // If something goes wrong (Code 400)
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

// Admin deletion
// POST API endpoint
app.post("/admin/delete", (req, res) => {
  console.log("Recieved user to delete");
  console.log(req.body);
  Admin.deleteOne({ _id: req.body.data })
    .then(() => {
      console.log("succesfully deleted user");
      res.status(200).send("Succesfully deleted from database");
    })
    .catch(err => {
      res.status(400).send("Unable to delete from database");
    });
});

// POST API endpoint
app.post("/admin/modify", (req, res) => {
  console.log("Recieved location to modify");
  console.log(req.body);
  Admin.findOneAndUpdate({ _id: req.body.data.id },
    {
      firstName: req.body.data.firstName,
      lastName: req.body.data.lastName,
      phone: req.body.data.phone,
      email: req.body.data.email,
      password: req.body.data.password
    })
    .then(() => {
      console.log("succesfully found admin");
      res.status(200).send("Succesfully modified from database");
    })
    .catch(err => {
      res.status(400).send("Unable to modify admin");
    });
});

// retrieve admin from id
app.post("/admin/single", (req, res) => {
  // return single admin
  let adminId = req.body.adminId
  console.log(adminId);
  Admin.findOne({ _id: adminId }).exec((err, admin) => {
    if (err) {
      console.log("error finding admin " + adminId)
      res.status(400).send("Unable to retrieve admin");
    } else {
      console.log(admin);
      res.status(200).send(admin);
    }
  })
})


// Square Payments
const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox'
});
// POST API endpoint
app.post("/square/pay", async (request, reply) => {
  let body = request.body;
  body.idempotencyKey = uuidv4();
  body.amountMoney = {
      amount: 100,
      currency: 'CAD',
  };
  let paymentResponse = paymentsApi.createPayment(body);
  paymentResponse.then((response) => {
      console.log(response)
      reply.send(response)
  })
});



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
