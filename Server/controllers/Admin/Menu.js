const express = require("express");
const router = express.Router();
const { uploadImageToCloudinary } = require("./../../utils/imageUploader");

const { addMenuItem, getAllMenuItems, deleteMenuItem } = require("../../dbfunction/Menu");


function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type)
}

exports.addMenu = async (req, res) => {
  try {
    const { name, category, amount } = req.body;
    const image = req.files.image;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    console.log(name, category, amount, image);

    const folderName = process.env.FOLDER_NAME;
    const supportedTypes = ['jpg', 'jpeg', 'png'];
    const imagefileType = image.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(imagefileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type not Supperted",
      });
    }
    const imageResponse = await uploadImageToCloudinary(image, folderName);

    await addMenuItem(name, category, amount, imageResponse.secure_url);
    return res.status(200).json({ message: `${name} is added to the menu successfully.` });

  } catch (error) {
    console.error('Error processing menu item form:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
}

exports.sendMenu = async (req, res) => {
  try {
    const allMenuItems = await getAllMenuItems();
    res.status(200).json(allMenuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
}

exports.deleteMenuItemByID = async (req, res) => {
  const { menuId } = req.params;

  try {
    const rowCount = await deleteMenuItem(menuId);

    if (rowCount === 0) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    return res.status(200).json({ message: 'Deletion successful' });
  } catch (error) {
    console.error('Error executing delete query:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}