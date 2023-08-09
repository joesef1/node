
//login | register

const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validateRegisterUser, validateLoginUser, validateUpdateUser, User} = require("../models/User");
const {verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyToken")

/*
* @desc update user
* @route /api/users/:id
* @method put
* @access private
*/
router.put("/:id",verifyTokenAndAuthorization, asyncHandler(async (req,res) => {


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






/** 
* @desc get all users
* @route /api/users
* @method get
* @access private (onlyadmin)
*/
router.get("/", verifyTokenAndAdmin, asyncHandler(async (req,res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);

}
));




/** 
* @desc get user
* @route /api/users/:id
* @method get
* @access private (onlyadmin and user)
*/
router.get("/:id",verifyTokenAndAuthorization, asyncHandler(async (req,res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
      res.status(200).json(user);
  }else{
    res.status(404).json({message:"user not found"});
  }

}
));






/** 
* @desc delete user
* @route /api/users/:id
* @method delete
* @access private (onlyadmin and user)
*/
router.delete("/:id",verifyTokenAndAuthorization, asyncHandler(async (req,res) => {
  const user = await User.findById(req.params.id).select("-password");
  
  if (user) {
    await User.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"user deleted"});
  }else{
    res.status(404).json({message:"user not found"});
  }

}
));



module.exports = router;
