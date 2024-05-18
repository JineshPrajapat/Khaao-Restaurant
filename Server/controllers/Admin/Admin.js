const express = require("express");
const router = express.Router();
const { uploadImageToCloudinary } = require("./../../utils/imageUploader");

const { checkAdminExist, createAdmin } = require("../../dbfunction/Admin");
const bcrypt = require("bcryptjs");
const { query } = require("../../conifg/database");

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type)
  }

exports.adminregister = async (req, res) => {
    try {
        const { name, phoneNumber, email, address, password } = req.body;
        const adminImage = req.files.adminImage;

        if (!name) {
            return res.status(400).send('Name is required');
        }
        const adminExists = await checkAdminExist(email);

        if (adminExists) {
            res.status(400).send('Admin already exist.')
        }

        const folderName = process.env.FOLDER_NAME;
        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const adminImagefileType = adminImage.name.split(".")[1].toLowerCase();

        if (!isFileTypeSupported(adminImagefileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not Supperted",
            });
        }
        const adminImageResponse = await uploadImageToCloudinary(adminImage, folderName);

        // hased the password
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
            if (err) {
                console.err('Error hasing password:', err);
                res.status(500).send('Internal server error');
            }

            // new admin account
            await createAdmin(name, phoneNumber, email, address, adminImageResponse.secure_url, hashedPassword);
            res.status(200).send(`Received form data: name=${name}, email=${email}, phoneNumber=${phoneNumber}, password=${hashedPassword}`);
        });
    } catch (error) {
        console.error('Error processing category form :', error);
        res.status(500).send('An error occurred while processing your request.')
    }
}


exports.getUsers = async (req, res) => {
    try {
        const queryText = 'SELECT * FROM rest.user';
        const allUsers = await query(queryText);

        res.status(200).json(allUsers.rows);

    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
}
