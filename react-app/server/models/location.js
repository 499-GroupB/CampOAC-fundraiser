// MongoDB / Mongoose order schema
// https://mongoosejs.com/docs/models.html
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for an order should be self explanatory
const LocationSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  stock: { type: Number, required: true },
});

// Export model
module.exports = mongoose.model("Location", LocationSchema);