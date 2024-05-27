const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { createUser, checkUserExist, getUserByEmail } = require("../dbfunction/User");
const { storeToken } = require("../dbfunction/Token");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { name, phone_number, email, password } = req.body;

  try {
    if (!name || !phone_number || !email || !password) {
      return res.status(400).send('All fields are required');
    }

    // Check if user exists in the database
    const userExists = await checkUserExist(email);
    if (userExists) {
      return res.status(400).send('User already exists');
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user account
    const user = await createUser(name, phone_number, email, hashedPassword);

    if (user) {
      const payload = {
        email: user.email,
        id: user.userid,
        name: user.username
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h"
      });
      const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
      await storeToken(user.userid, token, expiresAt);

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
      };

      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user: {
          id: user.userid,
          email: user.email,
          name: user.username
        },
        message: 'Registered successfully'
      });
    }
    else{
      return res.status(401).json({
        success:false,
        message:"Not registered, try again"
      })
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("from frontend", req.body);

  try {
    const user = await getUserByEmail(email);
    console.log(user);

    // Checking if user exists or not
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Verifying password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log('Login Successful');
      const payload = {
        email: user.email,
        id: user.userid,
        name: user.username
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h"
      });

      const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
      await storeToken(user.userid, token, expiresAt);

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
      };

      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user: {
          id: user.userid,
          email: user.email,
          name: user.username
        },
        message: 'Login successful'
      });
    }
    else {
      // Password does not match, authentication failed
      console.log('Authentication Failed');
      return res.status(401).send('Authentication Failed');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
}

