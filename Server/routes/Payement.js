const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/Auth");
const {razorpay, onSuccessfulPayment} =  require("../controllers/Payement");

router.post("/razorpay",auth, razorpay);
router.get("/onSuccessfulPayment",auth, onSuccessfulPayment );

module.exports = router;