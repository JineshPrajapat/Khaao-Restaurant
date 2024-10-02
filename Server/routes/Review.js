const express = require("express");
const {auth} = require("../middleware/Auth");
const router = express.Router();

const {sendReview, getReview} =  require("../controllers/Review");

router.post("/addreview",auth, sendReview);
router.get("/", getReview);
module.exports = router;