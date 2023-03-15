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
  locationId: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  isSuper: { type: Boolean, required: true},
});

// Export model
module.exports = mongoose.model("Admin", AdminSchema);