const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  shortDescription: String,
  description: String,
  isActive: Boolean,
  menuId: String,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
