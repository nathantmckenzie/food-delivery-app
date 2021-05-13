const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  id: String,
  menuItems: Array,
});

module.exports = mongoose.model("Menu", menuSchema);
