const express = require("express");
const router = express.Router();
const controller = require("../controllers/patientController");

// get all patients
router.get("/", controller.getPatients);

// add patient
router.post("/", controller.addPatient);

// approve patient
router.put("/approve/:id", controller.approvePatient);

// reject patient
router.put("/reject/:id", controller.rejectPatient);

// reset password
router.put("/reset-password", controller.resetPassword);

module.exports = router;