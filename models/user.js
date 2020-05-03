const mongoose = require("mongoose");

const userSchema = {
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
};

module.exports.schema = userSchema;
module.exports.model = mongoose.model("user", userSchema);
