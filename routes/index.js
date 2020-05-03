const express = require("express");
const router = express.Router();
const session = require("express-session");

router.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

let tempAppointment = {};

//Exports
const loginCheck = require("../middlewares/loginCheck");

// models
const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const DoctorTimeSlot = require("../models/doctorTimeSlots");
const DoctorTiming = require("../models/doctorTiming");
const Patient = require("../models/patient");
const User = require("../models/user");



router.get("/", async function(req, res) {
  console.log(req.session);
  res.render("home", {
    user: req.session
  });
});

//booking

router.get("/booking", loginCheck.requireLogin, async function(req, res) {
  if (req.session.doctorId) {
    res.render("booking", {
      user: req.session,
      doctor: await Doctor.model.findOne({_id: req.session.doctorId}),
      timeSlots: await DoctorTimeSlot.model.findOne({doctorId: req.session.doctorId})
    });
  } else {
    res.redirect("/search");
  }
});

router.post("/booking", function(req, res) {
  if (req.body.timeSlot && !Array.isArray(req.body.timeSlot)) {
    const dnt = req.body.timeSlot.split(",");
    tempAppointment = {};
    // console.log(tempAppointment);
    tempAppointment = {
      userId: req.session._id,
      doctorId: req.session.doctorId,
      date: dnt[0],
      timeSlot: dnt[1]
    };
    console.log(tempAppointment);
    res.redirect("/patientSelect");
  } else {
    // console.log("wdwecbij");
    res.redirect("/booking");
  }
  // console.log(req.body);
});

//Doctor Profile

router.get("/docProfile", async function(req, res) {
  if (req.session.doctorId) {
    res.redirect("/docProfile/" + req.session.doctorId);
  } else {
    res.redirect("/search");
  }
});

router.get("/docProfile/:doctorId", async function(req, res) {
  req.session.doctorId = req.params.doctorId;
  res.render("docProfile", {
    user: req.session,
    doctor: await Doctor.model.findOne({ _id: req.params.doctorId })
  });
});

//finaliseBooking

router.get("/finalizeBooking", loginCheck.requireLogin, function(req, res) {
  res.render("finalizeBooking", {
    user: req.session
  });
});

router.post("/finalizeBooking", async function(req, res) {
  // Doctor.findOne({
  //   _id: req.session.doctorId
  // }, function(err, foundDoctor) {
  //   Patient.findOne({
  //     _id: tempAppointment.patientId
  //   }, function(err, foundPatient) {
  //
  //   });
  // });
  const appointment1 = Appointment.model({
    userId: req.session.userId,
    username: req.session.fullName,
    userPhoneNumber: req.session.phoneNumber,
    doctorId: req.session.doctorId,
    doctor: await Doctor.model.findOne({ _id: req.session.doctorId }),
    patientId: tempAppointment.patientId,
    patient: await Patient.model.findOne({ _id: tempAppointment.patientId }),
    date: tempAppointment.date,
    timeSlot: tempAppointment.timeSlot
  });
  appointment1.save(function(err) {
    console.log(err);
  });
  res.redirect("/")
});

//hostital Profile

router.get("/hospitalProfile", function(req, res) {
  res.render("hospitalProfile", {
    user: req.session
  });
});

// user login page

router.get("/login", function(req, res, next) {
  if (req.session.loggedin) {
    res.redirect("/");
  } else {
    next();
  }
}, function(req, res) {
  res.render("login");
});

router.post("/login", async function(req, res) {

  const user = await User.model.findOne({
    phoneNumber: req.body.phoneNumber
  });
  if (req.body.password === user.password) {
    req.session.loggedin = true;
    req.session.userId = user._id;
    req.session.phoneNumber = user.phoneNumber;
    req.session.fullName = user.name;
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

// Patient Select

router.get("/patientSelect", loginCheck.requireLogin, async function(req, res) {
  res.render("patientSelect", {
    user: req.session,
    patients: await Patient.model.find({ user: req.session.userId }),
    doctor: await Doctor.model.findOne({ _id: req.session.doctorId })
  });
});


router.post("/patientSelect", function(req, res) {
  // console.log(req.body.patientId);
  tempAppointment.patientId = req.body.patientId;
  res.redirect("/finalizeBooking");
});



// register page

router.get("/register", function(req, res) {
  res.render("register");
});

router.post("/register", function(req, res) {
  const tempUser = User.model({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password
  });
  tempUser.save();
  res.redirect("login");
});

//Serach page

router.get("/search", async function(req, res) {
  if ((!req.query.filter) || (req.query.filter === "undefined")) {

    res.render("search", {
      user: {},
      doctors: await Doctor.model.find({})
    });
  } else {
    searchFilter = req.query.filter.split(",");

    res.render("search", {
      user: req.session,
      doctors: await Doctor.model.find({
        "department": {
          $in: searchFilter
        }
      })
    });
  }
});


router.post("/search", function(req, res) {
  res.redirect("/search?filter=" + req.body.select_specialist);
});


module.exports = router;
