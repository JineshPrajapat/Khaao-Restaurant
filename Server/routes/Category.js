const express = require("express");
const router = express.Router();

const {
    getCategory 
} = require("../controllers/Category");


router.get("/", getCategory);
module.exports = router;