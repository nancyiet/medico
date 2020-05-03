const mongoose = require("mongoose");

const doctorSchema = {
  firstName: String,
  lastName: String,
  sex: String,
  price: Number,
  department: String,
  location: String,
  status: {
  type: String,
  default: "active"  
  }
};

module.exports.schema = doctorSchema;
module.exports.model = mongoose.model("doctor", doctorSchema);
