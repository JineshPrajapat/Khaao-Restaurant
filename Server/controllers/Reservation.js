const express = require("express");
const router = express.Router();

const {insertReservation} = require("../dbfunction/Reservation");

exports.sendReservation = async(req, res) =>{
    try {
        const { name, seats, phone_number, date, time } = req.body;
        console.log(req.body);
    
        await insertReservation(name, seats, phone_number, date, time);
        return res.status(200).json({ message: 'We received your seats reservation request, Happy to see you soon.' });
      } catch (error) {
        console.error('Error processing reservation form:', error);
        return res.status(500).json({ message: 'An error occurred while processing your request.' });
      }
}