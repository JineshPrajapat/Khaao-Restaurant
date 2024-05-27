const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/Auth");
const{sendReservation, availableSlots} = require("../controllers/Reservation");

router.post("/createReservation", auth, sendReservation);
router.get("/availableSlots",availableSlots );

module.exports = router;