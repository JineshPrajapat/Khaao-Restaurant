const jwt = require("jsonwebtoken");
require("dotenv").config();

function requireLogin(req, res, next) {
    if (!req.session.userId) {
      req.flash('error', 'You must be logged in to access this page.');
      return res.redirect('http://localhost:3001/Login');
    }
    next();
  }
  
module.exports = { requireLogin };
  