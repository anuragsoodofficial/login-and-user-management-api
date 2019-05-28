const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the User Schema.
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "Employee"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;