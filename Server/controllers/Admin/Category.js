const express = require("express");
const {uploadImageToCloudinary} = require("./../../utils/imageUploader");
const router = express.Router();

const { insertCategory, deleteCategory } = require("../../dbfunction/Category");


function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type)
}


exports.addCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const categoryImage = req.files.categoryImage;

    if (!categoryImage) {
      return res.status(400).json({
        success: false,
        message: "Category image is required",
      });
    }
    console.log(category, categoryImage);

    const folderName = process.env.FOLDER_NAME;
    const supportedTypes = ['jpg', 'jpeg', 'png'];
    const categoryImagefileType = categoryImage.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(categoryImagefileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type not Supperted",
      });
    }
    const categoryImageResponse = await uploadImageToCloudinary(categoryImage, folderName);
    console.log("image uploaded to cloudinary");

    await insertCategory(category, categoryImageResponse.secure_url);
    console.log("added succesfuly");
    res.status(200).send(`${category} is added to the category successfully`);

  } catch (error) {
    console.error('Error processing category form:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
}

exports.deleteCategoryById = async (req, res) => {
  console.log(req.params);
  const { categoryId } = req.params;

  try {
    const rowCount = await deleteCategory(categoryId);

    if (rowCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    return res.status(200).json({ message: 'Deletion successful' });

  } catch (error) {
    console.error('Error occurred while deleting category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}