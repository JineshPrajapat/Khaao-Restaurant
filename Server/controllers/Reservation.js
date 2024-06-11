const express = require("express");
const router = express.Router();

const { insertReservation, getReservationsForDate, getAvailableTables } = require("../dbfunction/Reservation");


// Generate time slots
const generateTimeSlots = (start, end, interval) => {
  const slots = [];
  let current = start;

  while (current < end) {
    slots.push(current);
    current = new Date(current.getTime() + interval * 60000); // interval in milliseconds
  }

  return slots;
};

exports.sendReservation = async (req, res) => {
  const userId =  req.user.id;
  console.log("userId", userId);
  try {
    const {name, email, phone_number, numberOfGuests, reservationDate, reservationTime, tableNumber,specialRequest,transaction_id } = req.body;
    console.log(req.body);

    await insertReservation(userId, name, email, phone_number, numberOfGuests, reservationDate, reservationTime, tableNumber,specialRequest,transaction_id);
    return res.status(200).json({ message: 'We received your seats reservation request, Happy to see you soon.',data : req.body});
  } catch (error) {
    console.error('Error processing reservation form:', error);
    return res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
}

exports.availableSlots = async (req, res) => {
  const { date, number_of_people } = req.query;
  if (!date || !number_of_people) {
    return res.status(400).send('Date and number of people are required');
  }

  try {
    const tables = await getAvailableTables(number_of_people);
    const reservations = await getReservationsForDate(date, tables.map(table => table.id));

    // Generate all possible time slots for the date (e.g., from 10:00 AM to 10:00 PM)
    const startTime = new Date(`${date}T10:00:00`);
    const endTime = new Date(`${date}T22:00:00`);
    const interval = 60; // 60 minutes
    const allTimeSlots = generateTimeSlots(startTime, endTime, interval);

    // Filter available slots for each table
    const availableSlots = {};

    for (let table of tables) {
      availableSlots[table.table_number] = [];

      for (let slot of allTimeSlots) {
        const slotEnd = new Date(slot.getTime() + interval * 60000);
        const isSlotAvailable = !reservations.some(reservation => {
          if (reservation.table_id === table.id) {
            const reservationStart = new Date(`${date}T${reservation.time}`);
            const reservationEnd = new Date(reservationStart.getTime() + 60 * 60000);
            return (slot < reservationEnd && slotEnd > reservationStart);
          }
          return false;
        });

        if (isSlotAvailable) {
          availableSlots[table.table_number].push(slot);
        }
      }
    }
    res.status(200).json(availableSlots);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
