const express = require("express");
const _ = require("lodash");
const router = express.Router();

// models
const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const DoctorTimeSlot = require("../models/doctorTimeSlots");
const DoctorTiming = require("../models/doctorTiming");
const Patient = require("../models/patient");
const User = require("../models/user");

// All Admin
router.get("/", function(req, res) {
  res.render("admin/home");
});


// New Admin


// Appointment List
router.get("/appointmentList", async function(req, res) {
  res.render("admin/appointmentList", {
    appointments: await Appointment.model.find({})
  });
});

// Departments
router.get("/departmentList", function(req, res) {
  res.render("admin/departmentList");
});

// Doctor

// Doctor Dashboard

router.get("/doctorDashboard", async function(req, res) {
  res.render("admin/doctor/doctorDashboard");
});

router.get("/doctor/:doctorId", async function(req, res) {
  res.render("admin/doctor/doctorProfile", {
    doctor: await Doctor.model.findOne({
      _id: req.params.doctorId
    }),
    appointments: await Appointment.model.find({
      doctor: req.params.doctorId
    })
  });
});

// DoctorList
router.get("/doctorList", async function(req, res) {
  res.render("admin/doctor/doctorList", {
    doctors: await Doctor.model.find({})
  });
});

// Doctor Registration
router.get("/doctorRegistration", function(req, res) {
  res.render("admin/doctor/doctorRegistration", {
    doctor: new Doctor.model
  });
});

router.post("/doctorRegistration", async function(req, res) {
  console.log(req.body);
  const tempDoctor = Doctor.model({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    department: req.body.department,
    price: req.body.fees,
    sex: req.body.gender,
    location: req.body.location
  });
  try {
    const doc = await tempDoctor.save();
    res.redirect("./");
  } catch {
    res.redirect("doctorRegistration/?doctor=" + doc);
  }
});

// Doctor Time Slot
router.get("/doctorTimeSlots/:doctorId", async function(req, res) {

  let temp = new DoctorTimeSlot.model()
  temp = await DoctorTimeSlot.model.findOne({
    doctorId: req.params.doctorId
  });
  if (temp === null) {
    temp2 = DoctorTimeSlot.model({
      doctorId: req.params.doctorId
    })
    temp2.save();
    temp = await DoctorTimeSlot.model.findOne({
      doctorId: req.params.doctorId
    });
  }

  res.render("admin/doctor/doctorTimeSlots", {
    timeSlots: temp
  });
});

router.post("/doctorTimeSlots", function(req, res) {
  console.log(req.body);
  let timeSlot = {};
  switch (_.lowerCase(req.body.weekDay)) {
    case "sunday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $push: {
          sunday: req.body.startTime + " - " + req.body.endTime
        }
      }).exec();
      break;
    case "monday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $push: {
          monday: req.body.startTime + " - " + req.body.endTime
        }
      }).exec();
      break;
    case "tuesday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $push: {
          tuesday: req.body.startTime + " - " + req.body.endTime
        }
      }).exec()
      break;
    case "wednesday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $push: {
          wednesday: req.body.startTime + " - " + req.body.endTime
        }
      }).exec();
      break;
    case "thursday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $push: {
          thursday: req.body.startTime + " - " + req.body.endTime
        }
      }).exec();
      break;
    case "friday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $push: {
          friday: req.body.startTime + " - " + req.body.endTime
        }
      }).exec();
      break;
    case "saturday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $push: {
          saturday: req.body.startTime + " - " + req.body.endTime
        }
      }).exec();
      // timeSlot = DoctorTimeSlot.model({
      //   saturday: req.body.startTime + " - " + req.body.endTime
      // });
      break;
    default:
      console.log("Error");

  }
  res.redirect("/admin/doctorTimeSlots/" + req.body.doctorId);
});

router.post("/deleteDoctorTimeSlot", function(req, res) {
  switch (req.body.day) {
    case "sunday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $pull: {
          sunday: req.body.timeSlot
        }
      }).exec();
      break;
    case "monday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $pull: {
          monday: req.body.timeSlot
        }
      }).exec();
      break;
    case "tuesday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $pull: {
          tuesday: req.body.timeSlot
        }
      }).exec();
      break;
    case "wednesday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $pull: {
          wednesday: req.body.timeSlot
        }
      }).exec();
      break;
    case "thursday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $pull: {
          thursday: req.body.timeSlot
        }
      }).exec();
      break;
    case "friday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $pull: {
          friday: req.body.timeSlot
        }
      }).exec();
      break;
    case "saturday":
      DoctorTimeSlot.model.updateOne({
        doctorId: req.body.doctorId
      }, {
        $pull: {
          saturday: req.body.timeSlot
        }
      }).exec();
      break;
  }
  res.redirect("/admin/doctorTimeSlots/" + req.body.doctorId);
});

// login
router.get("/login", function(req, res) {
  res.render("admin/login");
});

//PatientList
router.get("/patientList", async function(req, res) {
  res.render("admin/patientList", {
    patients: await Patient.model.find({})
  });
});

// Register
router.get("/register", function(req, res) {
  res.render("admin/register");
});


module.exports = router;
