const express = require("express");
require("dotenv").config();
const router = express.Router();
const mailSender = require("../utils/mailSender");
const { paymentTemplate } = require("../mails/paymentTemplate");
const shortid = require("shortid");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

const formatTime  = (time) =>{
    const timeSlot = time;
    const convertedtime = new Date(`2000-01-01T${timeSlot}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return convertedtime;
  }

exports.razorpay = async (req, res) => {
    const payment_capture = 1;

    console.log("ammount ", req.body.amount);

    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
        receipt: shortid.generate(),
        payment_capture,
    };

    try {
        const response = await razorpay.orders.create(options);
        console.log(response);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.log(error);
    }
}


exports.onSuccessfulPayment = async (req, res) => {
    try {
        const { email, name, seats, date, time, tableNumber, transaction_id } = req.body;

        console.log('Email:', email);

        const emailInfo = await mailSender(email, `Khaao Restaurant : Payment Verifcation`, paymentTemplate(name, seats, date, formatTime(time), tableNumber, transaction_id))
        console.log("emailInfo", emailInfo);
        if (emailInfo) {
            res.status(200).json({ message: 'Mail sent successful', data: req.body });
        }
        else {
            res.status(403).json({ message: 'Mail not sent successful', data: req.body });
        }
    }
    catch (error) {
        console.log("Server Error:", error);
    }
}