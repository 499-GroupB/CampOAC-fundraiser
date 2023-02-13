// MongoDB / Mongoose order schema
// https://mongoosejs.com/docs/models.html
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for an admin should be self explanatory
const AdminSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 100 },
  lastName: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  phone: { type: String, required: true, maxLength: 100 },
  location: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
});

// Export model
module.exports = mongoose.model("Admin", OrderSchema);