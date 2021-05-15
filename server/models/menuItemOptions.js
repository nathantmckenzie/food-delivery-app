const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuItemOptionsSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
  menuItemId: Number,
  calories: Number,
});

module.exports = mongoose.model("Menu Item Options", menuItemOptionsSchema);
