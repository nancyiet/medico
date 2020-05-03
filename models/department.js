const mongoose = require("mongoose");

const departmentSchema = {
  code: String,
  name: String,
};

module.exports.schema = departmentSchema;
module.exports.model = mongoose.model("doctor", departmentSchema);
