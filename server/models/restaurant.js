const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  shortDescription: String,
  description: String,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
