const express = require('express');
const router = express.Router();
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const { getAllAuthors, getAuthorById, createAuthor, updateAuthorById, deleteAuthor } = require('../controllers/authorsController');

router.route("/")
                .get(getAllAuthors)
                .post(createAuthor);

router.route("/:id")
                .get(getAuthorById)
                .put(verifyTokenAndAdmin,updateAuthorById)
                .delete(verifyTokenAndAdmin, deleteAuthor);
                
module.exports = router


















