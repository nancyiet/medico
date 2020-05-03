const mongoose = require("mongoose");

const patientSchema = {
  firstName: String,
  lastName: String,
  dob: Date,
  sex: String,
  emailId: String,
  phoneNumber: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: {
    type: String,
    default: "India"
  },
  user: String
};

module.exports.schema = patientSchema;
module.exports.model = mongoose.model("patient", patientSchema);
