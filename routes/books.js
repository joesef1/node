const express = require('express');
const router = express.Router();

const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const { getAllBooks, getBookById, createBook, updateBookById, deleteBook } = require('../controllers/bookController');

  //api books
  router.route("/")
                  .get(getAllBooks)
                  .post(verifyTokenAndAdmin, createBook);
  
  router
  .route("/:id")
  .get(getBookById)
  .put(verifyTokenAndAdmin, updateBookById)
  .delete(verifyTokenAndAdmin,deleteBook)
    

module.exports = router


















