const { query } = require("../conifg/database");

const getAllReservations = async () => {
    const queryText = 'SELECT * FROM rest.reservation';
    const { rows } = await query(queryText);
    return rows;
};

const insertReservation = async (userId, name, eamil, numberOfGuests, phoneNumber, reservationDate, reservationTime, tableNumber,specialRequest) => {
    const queryText = 'INSERT INTO rest.reservation (userid, name, eamil, partysize, contact_number, date, time, table_id,specialRequest ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [userId, name, eamil, numberOfGuests, phoneNumber, reservationDate, reservationTime, tableNumber,specialRequest];
    await query(queryText, values);
};

const getAvailableTables = async (number_of_people) => {
    const queryText = `
        SELECT id, table_number, capacity
        FROM rest.table
        WHERE capacity = $1
    `;
    const values = [number_of_people];
    const result = await query(queryText, values);
    return result.rows;
};

const getReservationsForDate = async (date, tableIds) => {
    const queryText = `
        SELECT table_id, time, time + interval '1 hour' AS end_time
        FROM rest.reservation
        WHERE date = $1
        AND table_id = ANY($2::int[])
    `;
    const values = [date, tableIds];
    const result = await query(queryText, values);
    return result.rows;
};

module.exports = {
    getAllReservations,
    insertReservation,
    getAvailableTables,
    getReservationsForDate
};
