const express = require("express");
const router = express.Router();

const {sendReview, getReview} =  require("../controllers/Review");

router.post("/addreview", sendReview);
router.get("/", getReview);
module.exports = router;