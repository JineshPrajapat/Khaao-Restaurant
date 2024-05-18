const express = require("express");
const router = express.Router();

const{sendReservation} = require("../controllers/Reservation");

router.post("/createReservation", sendReservation);

module.exports = router;