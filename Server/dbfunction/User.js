const { query } = require("../conifg/database");
const generateUniqueId = require("../utils/generateUniqueId"); 

const checkUserExist = async (email) => {
  const queryText = 'SELECT * FROM rest.user WHERE email = $1'; // Updated query to use double quotes around "user"
  const values = [email];

  const { rowCount } = await query(queryText, values);
  return rowCount > 0;
};

const createUser = async (name, phone_number, email, password) => {
  const id = generateUniqueId();
  const queryText = 'INSERT INTO rest.user (userid, username, contact_number, email, password) VALUES ($1, $2, $3, $4, $5)'; 
  const values = [id, name, phone_number, email, password];

  await query(queryText, values);
};

const getUserByEmail = async (email) => {
  const queryText = 'SELECT * FROM rest.user WHERE email=$1;'
  const values = [email];

  const { rows } = await query(queryText, values);
  return rows.length > 0 ? rows[0] : null;
}

module.exports = {
  checkUserExist,
  createUser,
  getUserByEmail
};