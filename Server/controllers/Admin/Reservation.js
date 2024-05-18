const express = require("express");
const router = express.Router();
const { getAllReservations } = require("../../dbfunction/Reservation");

exports.getReservation = async (req, res) => {
    try {
        const allReservations = await getAllReservations();
        res.json(allReservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
}