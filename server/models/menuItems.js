const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  menuId: String,
});

module.exports = mongoose.model("Menu Item", menuItemSchema);
