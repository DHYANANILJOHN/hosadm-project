const express = require("express");
const router = express.Router();
const controller = require("../controllers/patientController");

// AUTH
router.post("/register", controller.register);
router.post("/login", controller.login);

// ADMIN
router.get("/", controller.getPatients);
router.put("/approve/:id", controller.approvePatient);
router.put("/reject/:id", controller.rejectPatient);

// RESET
router.put("/reset-password", controller.resetPassword);

module.exports = router;