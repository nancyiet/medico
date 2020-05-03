const mongoose = require("mongoose");

const doctorTimeSlotSchema = {
  doctorId: String,
  sunday: [String],
  monday: [String],
  tuesday: [String],
  wednesday: [String],
  thursday: [String],
  friday: [String],
  saturday: [String],
};

module.exports.schema = doctorTimeSlotSchema;
module.exports.model = mongoose.model("doctorTimeSlot", doctorTimeSlotSchema);
