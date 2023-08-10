

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require('../controllers/authController');


//login | register
router.post("/register",registerUser);
router.post("/login", loginUser);



module.exports = router;













