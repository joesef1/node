
const express = require('express');
const router = express.Router();

const {verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const { updateUser, getAllUser, getUser, deleteUser } = require('../controllers/userController');


router.put("/:id",verifyTokenAndAuthorization, updateUser);
router.get("/", verifyTokenAndAdmin, getAllUser);
router.get("/:id",verifyTokenAndAuthorization, getUser);
router.delete("/:id",verifyTokenAndAuthorization,deleteUser);



module.exports = router;
