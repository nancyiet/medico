const mongoose = require("mongoose");

const adminUserSchema = {
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

module.exports.schema = adminUserSchema;
module.exports.model = mongoose.model("adminUser", adminUserSchema);
