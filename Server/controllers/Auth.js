const express = require("express");
const router = express.Router();
const { createUser, checkUserExist, getUserByEmail } = require("../dbfunction/User");
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
    await createUser(name, phone_number, email, hashedPassword);
    res.status(200).send('User registered successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("from frontend", req.body);

  try {
    // getting user info
    const user = await getUserByEmail(email);
    console.log(user);

    // checking user exits or not
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    //verifying password
    bcrypt.compare(password, user.password, (err, results) => {
      if (err) {
        console.log('Password details', user.password);
        console.log('Error comparing password:', err);
        return res.status(500).send('Error comparing password');
      }

      // Is verified the allow authentication
      if (results) {
        // req.session.userId = user.userid;                        // Store the userId in session
        console.log('Login Succesful');
        return res.status(200).json({ message: 'Login successful' });         //return json response with success property
      }
      else {
        // Password not match, authentication failed
        console.log('Authentication Failed');
        return res.status(401).send('Authentication Failed');
      }
    });
  } catch (error) {
    console.error('Error:', err)
    res.status(500).send('Internal server error');
  }
}
