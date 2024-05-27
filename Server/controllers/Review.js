const express = require("express");
const router = express.Router();

const { insertReview, getReviews } = require("../dbfunction/Review");

exports.sendReview = async (req, res) => {
    try {
        const { reviewText, rating } = req.body;
        const userId =  req.user.id;

        await insertReview(userId, reviewText, rating);
        res.status(201).json("review added successfully");
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
};

exports.getReview = async (req, res) => {
    try {
        const allReviews = await getReviews();
        res.json(allReviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
}