// global npm requirements
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { Client, ApiError } = require("square");
const { uuid } = require('uuidv4');
const { randomUUID } = require("crypto");
const pdf = require('html-pdf');
const nodemailer = require("nodemailer");

// local requisites
const Order = require('./models/order');
const Location = require('./models/location');
const Admin = require('./models/admin');
const auth = require('./credentials');
const invoiceTemplate = require('./models/invoiceTemplate');
const smsTemplate = require('./models/smsInvoice');
const smsClient = require('twilio')(auth.twilioSid, auth.twilioAuth);

// conf
const PORT = 3000;
// Database conf
const mongoDB = "mongodb+srv://" + auth.mongo + "@wooddb.m6hauwo.mongodb.net/?retryWrites=true&w=majority";

// Square payments api
const { paymentsApi } = new Client({
  accessToken: auth.squareToken,
  environment: 'sandbox'
});

// Use mongoose to connect to the URL and pass parameters
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// initialize connection and log error message if anything goes wrong
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Function to send mail
async function sendMail(mailOptions) {
  console.log("Attempting to send email ...")
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      clientId: auth.gmailClientId,
      clientSecret: auth.gmailClientSecret,
    },
  });
  await transporter.sendMail(mailOptions, (err, info) => {
    console.log(err);
    console.log(info);
  })
  return null;
}

// function to send SMS
function sendSMS(content, to) {
  console.log("Attempting to send sms ...")
  smsClient.messages
    .create({ body: content, from: "+15076836220", to: to})
    .then(message => console.log("Sent a message: " + message.sid))
    .catch((error) => {
      // twilio error
      console.log(error);
    })
}

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

      // sende email
      let mailOptions = {
        from: "Rotary x CampOAC Wood fundraiser",
        to: req.body.email,
        subject: "Rotary x CampOAC Firewood Invoice",
        text: "Thanks for your order, order id is: " + item._id,
        auth: {
          user: "capstone499.groupb@gmail.com",
          refreshToken: auth.gmailRefreshToken,
          accessToken: auth.gmailAccessToken,
          expires: 1484314697598,
        }
      }
      sendMail(mailOptions);

      // send sms
      if(item.sms === 'true'){
        let message = "Thank you " + item.firstName + " " + item.lastName + " for your purchase of " + item.numBags + " bags of firewood on " + item.date + ".\n\nOrder number: " + item._id
        sendSMS(message, item.phone);
      }
    
      // Update stock based on new  order
      Location.findOneAndUpdate({ name: item.pickUp }, { $inc: { stock: -item.numBags } })
        .then(() => {
          console.log("succesfully updated stock to reflect new order");
          /*Location.findOne({ name: item.pickUp}, "stock", (err, stock) =>{
            if (err) return handleError(err);
            if(stock.toObject()<=10){
              Admin.find("phone", (err, phones) =>{
                if (err) return handleError(err);
                for(phone in phones){
                  client.messages.create({
                    body: `Low stock alert. Only ${stock} bags remain at ${item.pickUp}`,
                    from: +16693483413,
                    to: phone.toObject(),
                  })
                  .then(message => console.log(message.sid));
                };
              });
            };
          });
        })*/
        })
        .catch(err => {
          console.log("undable to modify stock on location")
        });
      //});
      // return new order id
      if (item.payment == 'credit') {
        res.status(200).send({ newOrder: newOrder, payment: true })
      } else {
        res.status(200).send({ newOrder: newOrder, payment: false });
      }
      // If something goes wrong (Code 400)
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

app.post("/order/fulfill", (req, res) => {
  // return all orders
  console.log("Recieved order to fulfill");
  console.log(req.body);
  Order.findOneAndUpdate({ _id: req.body.data }, { fulfilled: true })
    .then(() => {
      console.log("succesfully found order");
      res.status(200).send("Succesfully fulfilled order from database");
    })
    .catch(err => {
      res.status(400).send("Unable to fulfill order");
    });
})

// Login Authentication
// POST API endpoint
app.post("/login/auth", (req, res) => {

  // Display response to console
  console.log("Recieved login request: ");

  // Output details of request
  console.log(req.body);

  Admin.findOne({ email: req.body.email }).exec((err, admin) => {
    if (err) {
      res.send({ status: -1, user: {} }) // status -1 for failure
    }

    if (admin) {
      if (admin.password == req.body.password) {
        if (admin.isSuper) {
          res.send({ status: 1, user: admin })
        } else {
          res.send({ status: 2, user: admin }) // status 2 for login
        }
      } else {
        res.send({ status: -1, user: {} }) // status -1 for failure
      }
    } else {
      res.send({ status: -1, user: {} })
    }
  })
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
  Location.findOneAndUpdate({ _id: req.body.data.id }, { stock: req.body.data.stock, contact: req.body.data.contact, adminId: req.body.data.adminId, address: req.body.data.address, admin: req.body.admin })
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
      console.log("Order data sent.")
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
      res.status(200).send({ order: {}, msg: "No orders with that ID found" });
    } else {
      // check to verify email is correct
      if (req.body.email) {
        if(req.body.email == order.email){
        console.log("found order " + orderId);
        res.status(200).send({ order: order, msg: "Order found" });
        }
      } else {
        console.log("Email did not match orderid entered")
        res.status(200).send({ order: {}, msg: "Incorrect credentials" });
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
  console.log("Location ID: " + locationId);
  Location.findOne({ _id: locationId }).exec((err, location) => {
    if (err) {
      console.log("error finding location " + locationId)
      res.status(400).send("Unable to retrieve location");
    }
    console.log(location);
    res.status(200).send(location);
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
      res.status(200).send(item._id);
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
  console.log("Admin ID: " + adminId);
  Admin.findOne({ _id: adminId }).exec((err, admin) => {
    if (err) {
      console.log("error finding admin " + adminId)
      res.status(400).send("Unable to retrieve admin");
    }
    console.log(admin);
    res.status(200).send(admin);
  })
})

// used to resolve admin names from id (useful for locations)
app.post("/admin/name", (req, res) => {
  console.log(req.body);
  let adminId = req.body.adminId
  Admin.findOne({ _id: adminId }).exec((err, admin) => {
    if (err) {
      console.log("error getting name from: " + adminId);
      res.status(200).send({ firstName: "unknown", lastName: "unknown" });
    } else {
      //console.log("Recieved name: " + admin.firstName + " " + admin.lastName);
      res.status(200).send({ firstName: /*admin.firstName*/"unknown", lastName: "unknown"/*admin.lastName*/ });
    }
  });
})

// SQUARE API END point
app.post("/payment/pay", async (req, res) => {
  const { result } = await paymentsApi.createPayment({
    idempotencyKey: uuid(),
    sourceId: req.body.data,
    amountMoney: {
      currency: 'CAD',
      amount: req.body.orderTotal
    }
  })
  console.log(result);
  console.log("paid");
  // ORDER FULFILL
  Order.findOneAndUpdate({ _id: req.body.orderId }, { fulfilled: true })
    .then(() => {
      console.log("succesfully found order");
    })
    .catch(err => {
      res.status(400).send("Unable to fulfill order");
    });

  res.status(200).send({ state: 1, msg: "Good job" })
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
