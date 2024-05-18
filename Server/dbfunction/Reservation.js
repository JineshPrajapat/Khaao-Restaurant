const { query } = require("../conifg/database");

const getAllReservations = async () => {
    const queryText = 'SELECT * FROM rest.reservation';
    const { rows } = await query(queryText);
    return rows;
};

const insertReservation = async (name, seats, phoneNumber, date, time) => {
    const queryText = 'INSERT INTO rest.reservation (userid, name, partysize, contact_number, date, time) VALUES (5, $1, $2, $3, $4, $5)';
    const values = [name, seats, phoneNumber, date, time];
    await query(queryText, values);
};


module.exports = {
    getAllReservations,
    insertReservation,
};
