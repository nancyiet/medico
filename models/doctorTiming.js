const mongoose = require("mongoose");

const doctorTimingSchema = {
  doctorId: String,
  timeSlot: [String]
};

module.exports.schema = doctorTimingSchema;
module.exports.model = mongoose.model("doctorTiming", doctorTimingSchema);
