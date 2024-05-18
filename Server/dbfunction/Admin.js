const { query } = require("../conifg/database");

const checkAdminExist = async (email) => {
    const queryText = 'SELECT * FROM rest.admin WHERE email = $1';
    const values = [email];

    const { rowCount } = await query(queryText, values);
    return rowCount > 0;
};

const createAdmin = async (name, phone_number, email, address, image, hashedPassword) => {
    const queryText = 'INSERT INTO rest.admin (name, contact_number, email, address, imageurl, password) VALUES($1, $2, $3, $4, $5, $6)';
    const values = [name, phone_number, email, address, image, hashedPassword];
    await query(queryText, values);
};

module.exports = {
    checkAdminExist,
    createAdmin
};