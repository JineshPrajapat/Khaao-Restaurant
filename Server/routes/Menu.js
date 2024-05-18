const express = require("express");
const router = express.Router();

const {
    getCategory, 
    getBreakfastMenu,
    getSelectedMenu
} = require("../controllers/Menu");


router.get("/", getCategory);
router.get('/Breakfast', getBreakfastMenu);
router.get("/:selectedVariety", getSelectedMenu);
module.exports = router;

