const {query} = require("../conifg/database");

const insertReview = async(userId, reviewText, rating) =>{
    const queryText = "INSERT INTO rest.review (userid, rating, comments) Values ($1, $2, $3)";
    const values = [userId,rating, reviewText];
    await query(queryText, values);
}

const getReviews = async() =>{
    const queryText = "SELECT * FROM rest.review";
    const {rows}  = await query(queryText);
    return rows;
}

module.exports = {
    insertReview,
    getReviews
}

