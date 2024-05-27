const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const {auth, isAdmin }= require("../../middleware/Auth");

const {
    getUsers, adminregister, adminSignUp
} = require("../../controllers/Admin/Admin");
const { getReservation } = require("../../controllers/Admin/Reservation");
const { getCategory } = require("../../controllers/Category");
const {addMenu, sendMenu, deleteMenuItemByID}= require("../../controllers/Admin/Menu")

const {addCategory, deleteCategoryById} = require("../../controllers/Admin/Category");

// Admin
router.post("/adminRegister", adminregister);
router.post("/adminLogin", adminSignUp);
// router.post("/adminRegister", upload.single('image'), adminregister);
router.get("/getusers", auth, isAdmin, getUsers);


// Reservation
router.get("/getReservation", auth, isAdmin, getReservation);


// Category
router.post("/addCategory", auth, isAdmin, addCategory);
router.post('/addCategory', upload.single('image'), addCategory);
router.get("/viewCategory", getCategory);
router.delete("/deleteCategory/:categoryId", auth, isAdmin, deleteCategoryById);


//Menu

router.post("/addMenu", auth, addMenu);
router.post('/addMenu', upload.single('image'), addMenu);
router.get("/viewMenu", auth,sendMenu );
router.delete("/deleteMenu/:menuId", auth, isAdmin, deleteMenuItemByID);

module.exports = router;