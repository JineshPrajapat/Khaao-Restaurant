// const { Client } = require('pg');
// require('dotenv').config();

// const client = new Client({
//   host: process.env.PGHOST,
//   port: process.env.PGPORT,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   database: process.env.PGDATABASE,
//   schema: process.env.PGSCHEMA
// });

// client.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database: ', err);
//     return;
//   }
//   console.log('Connected to the database');
// });

// module.exports = client;


const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  schema: process.env.PGSCHEMA
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database: ', err);
  }
};

const query = async (text, params) => {
  try {
    const res = await client.query(text, params);
    return res;
  } catch (err) {
    console.error('Error executing query: ', err);
    throw err;
  }
};

module.exports = {
  connectDB,
  query
};
