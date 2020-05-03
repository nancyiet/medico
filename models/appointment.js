const mongoose = require("mongoose");
const doctor = require("./doctor");
const patient = require("./patient");

const appointmentSchema = {
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String
  },
  userPhoneNumber: {
    type: String,
    require: true
  },
  doctorId: String,
  doctor: {
    type: doctor.schema,
    required: true
  },
  patientId: String,
  patient: {
    type: patient.schema,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  bookingTime: {
    type: Date,
    default: Date.now()
  }
};

module.exports.schema = appointmentSchema;
module.exports.model = mongoose.model("appointment", appointmentSchema);
