const express = require("express");
const router = express.Router();
const {getAllCategories}= require("../dbfunction/Category");

exports.getCategory = async(req, res) =>{
    try {
        const allCategories =  await getAllCategories();
        res.json(allCategories);
        
      } catch (error) {
        console.error('Error fetching categories : ', error);
        res.status(500).send('An error occurred while processing your request.')
      }
}

