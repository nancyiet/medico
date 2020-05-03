const express = require("express");
const router = express.Router();
const session = require("express-session");

router.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//Exports
const loginCheck = require("../middlewares/loginCheck");

// Models
const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

router.get("/", function(req, res) {
  res.render("dashboard");
});


//Patient dashboard

router.get("/patientDashboard", async function(req, res) {
  res.render("user/patientDashboard", {
    user: req.session,
    appointments: await Appointment.model.find({userId: req.session.userId})
  });
});

// patientrofile

router.get("/patientProfile", loginCheck.requireLogin, async function(req, res) {
  res.render("user/patientProfile", {
    user: req.session,
    patient: await Patient.model.findOne({})
  });
});

router.post("/patientProfile", function(req, res) {
  console.log(req.body);
  const patient1 = Patient.model({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    sex: req.body.sex,
    dob: req.body.dob,
    emailId: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    country: req.body.country,
    user: req.session.userId
  });
  patient1.save(function(err) {
    console.log(err);
  });
  res.redirect("/patientSelect");
});

//Logout

router.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
    // cannot access session here
  })
  res.redirect("/login");
});


// Exports
module.exports = router;
