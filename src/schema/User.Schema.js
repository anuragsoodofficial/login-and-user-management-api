const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pwd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\/.!@#$%^&*()_+-=])(?=.{8,})");

// Create the User Schema.
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (password) => {
        return pwd.test(password);
      }
    }
  },
  role: {
    type: String,
    default: "Employee",
    validate: {
      validator: (role) => {
        return /^([a-zA-Z ]{5,10})+$/.test(role);
      }
    }
  },
  name: {
    type: String,
    required: true,
    validate: {
      validator: (name) => {
        return /^([a-zA-Z ]{2,30})+$/.test(name);
      }
    }
  },
  employeeId: {
    type: String,
    required: true,
    validate: {
      validator: (employeeId) => {
        return /^([a-zA-Z0-9 ]{2,30})+$/.test(employeeId);
      }
    }
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;