
//login | register

const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validateRegisterUser, validateLoginUser, validateUpdateUser, User} = require("../models/User");
const {verifyToken} = require("../middlewares/verifyToken")

/*
* @desc update user
* @route /api/users/:id
* @method put
* @access private
*/
router.put("/:id",verifyToken, asyncHandler(async (req,res) => {

  if(req.user.id !== req.params.id) {
    return res.status(403)
    .json({message: "You are not allowed, you only can update your profile"})
  }




    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password ,salt );
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
      $set:{
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
      }
     },{new:true}).select("-password")

    res.status(200).json(updatedUser);

  }
));

module.exports = router;
