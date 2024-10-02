const { Client } = require('pg');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT, ENDPOINT_ID, PGSCHEMA } = process.env;

const client = new Client({
    host: PGHOST,
    port: PGPORT || 5432,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    options: `project=${ENDPOINT_ID}`,
});


const connectToDatabase = async () => {
    try {
        await client.connect();
        if (PGSCHEMA) {
            await client.query(`SET search_path TO ${PGSCHEMA}`);
            // console.log(`Schema set to ${PGSCHEMA}`);
        }
        console.log('Connected to PostgreSQL database');
    } catch (error) {
        console.error('Connection error:', error.stack);
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
    connectToDatabase,
    query,
};
