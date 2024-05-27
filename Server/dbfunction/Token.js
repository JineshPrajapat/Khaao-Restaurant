const { query } = require("../conifg/database");

const storeToken = async (userId, token, expiresAt) => {
    const findQuery = "SELECT * FROM rest.tokens WHERE user_id = $1";
    const updateQuery = "UPDATE rest.tokens SET token = $2, expires_at = $3 WHERE user_id = $1";
    const insertQuery = "INSERT INTO rest.tokens (user_id, token, expires_at) VALUES($1, $2, $3)";
    const values = [userId, token, expiresAt];

    try {
        const existingToken = await query(findQuery, [userId]);
        if (existingToken.rowCount > 0) {
            await query(updateQuery, values);
        } else {
            await query(insertQuery, values);
        }
    } catch (error) {
        console.error('Error storing or updating token:', error);
        throw error;
    }
};

module.exports = {
    storeToken
}