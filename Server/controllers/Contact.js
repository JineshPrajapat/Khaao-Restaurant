const express = require("express");
require("dotenv").config();
const router = express.Router();
const mailSender  = require("../utils/mailSender");
const { contactTemplate } = require("../mails/contactTemplate");

exports.mailContact = async (req, res) => {
    const { name, email, phone_number, enquiry, message } = req.body;
    console.log(req.body);
    try {
        const emailInfo = await mailSender("college.chat242@gmail.com", `Have a new message from ${name}!`, contactTemplate(name, email, phone_number, enquiry, message));
        if (!emailInfo) {
            console.log("email not send");
            return res.status(400).json({
                success: flase,
                message: "Mail not recieved."
            })
        }
        return res.status(200).json({
            success: true,
            message: "Mail recieved successfully"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Message Failure, try again.",
        });

    }
}