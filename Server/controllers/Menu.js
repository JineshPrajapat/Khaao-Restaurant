const express = require("express");
const router = express.Router();

const {getAllCategories, getCategoryIdByVariety} = require("../dbfunction/Category");
const {getBreakfastMenu, getMenuItemsByCategoryId} = require("../dbfunction/Menu");


exports.getCategory = async(req, res) =>{
    try {
        const allCategories =  await getAllCategories();
        res.json(allCategories);
      } catch (error) {
        console.error('Error fetching categories : ', error);
        res.status(500).send('An error occurred while processing your request.')
      }
}

exports.getBreakfastMenu = async(req, res) =>{
    try {
        const allMenuItemBasedOnCategory = await getBreakfastMenu();
        res.json(allMenuItemBasedOnCategory);
    
      } catch (error) {
        console.error('Error fetching menu items based on Breakfast category,', error);
        res.status.apply(500).send('An error occurred while processing your request.');
      }
}

exports.getSelectedMenu = async(req, res) =>{
    const { selectedVariety } = req.params;
  try {

    const categoryId = await getCategoryIdByVariety(selectedVariety);
    // checking category_id exist or not
    if (!categoryId) {
      return res.status(404).send('Category not found.');
    }
    const allMenuItemBasedOnCategory = await getMenuItemsByCategoryId(categoryId);
    res.json(allMenuItemBasedOnCategory);

  } catch (error) {
    console.error('Error fetching menu items based on category,', error);
    res.status.apply(500).send('An error occurred while processing your request.');
  }
}