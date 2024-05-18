const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const {
    getUsers, adminregister, 
} = require("../../controllers/Admin/Admin");
const { getReservation } = require("../../controllers/Admin/Reservation");
const { getCategory } = require("../../controllers/Category");
const {addMenu, sendMenu, deleteMenuItemByID}= require("../../controllers/Admin/Menu")

const {addCategory, deleteCategoryById} = require("../../controllers/Admin/Category");

// Admin
router.post("/adminRegister", adminregister);
// router.post("/adminRegister", upload.single('image'), adminregister);
router.get("/getusers", getUsers);

// Reservation
router.get("/getReservation", getReservation);


// Category
router.post("/addCategory", addCategory);
router.post('/addCategory', upload.single('image'), addCategory);
router.get("/viewCategory", getCategory);
router.delete("/deleteCategory/:categoryId", deleteCategoryById);


//Menu

router.post("/addMenu", addMenu);
router.post('/addMenu', upload.single('image'), addMenu);
router.get("/viewMenu", sendMenu );
router.delete("/deleteMenu/:menuId", deleteMenuItemByID);

module.exports = router;