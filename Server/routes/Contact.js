const express = require("express");
const router = express.Router();

const {mailContact } = require("../controllers/Contact");

router.post("/", mailContact);

module.exports = router;