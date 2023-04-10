// MongoDB / Mongoose order schema
// https://mongoosejs.com/docs/models.html
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for an order should be self explanatory
const LocationSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  stock: { type: Number, required: true, min: [0, 'Too few wood'], max: 1000 },
  contact: { type: String, required: true, maxLength: 20},
  adminId: { type: String, required: true, maxLength: 100},
  admin: { type: Object, required: false },
  address: { type: String, required: true, maxLength: 100},
  //address: { type: String}, field for detailed pickup address for use in invoice
});

// Export model
module.exports = mongoose.model("Location", LocationSchema);