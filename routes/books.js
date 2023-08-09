const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const {validateCreateBook,validateUpdateBook, Book} = require("../models/Book");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken")





/*
* @desc get all books
* @route /api/books
* @method get
* @access public
*/


router.get('/', asyncHandler(
  async (req, res) => {
      const books =await Book.find().populate("author", ["firstName"])
    res.status(200).json(books);    
  }
));


/*
* @desc get one book by id
* @route /api/books/:id
* @method get
* @access public
*/

router.get('/:id', asyncHandler(
  async (req, res) => {  
      const book = await Book.findById(req.params.id);
      if (Book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: 'book not found' });
      }
    }
));





/*
* @desc create book
* @route /api/books
* @method post
* @access private
*/
router.post("/",verifyTokenAndAdmin, asyncHandler(
  async (req,res) => {
    const { error } = validateCreateBook(req.body) ;
      if(error) {
      return res.status(400).json({ message: error.details[0].message });
      }

    const book = new Book({
      title:       req.body.title,
      author:      req.body.author,
      description: req.body.description,
      price:       req.body.price,
      cover:       req.body.cover
      });
      
      const result =await book.save()
      res.status(201).json(result);
    }
));


// //////////////////////////////////////////

/*
* @desc update book by id
* @route /api/books/:id
* @method put
* @access private
*/


// /////////////////////////
  router.put("/:id",verifyTokenAndAdmin, asyncHandler(
    async (req, res) => {
      const { error } = validateUpdateBook(req.body);
    
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
    
          const book = await Book.findByIdAndUpdate(
          req.params.id,{
        $set:{
          title:       req.body.title,
          author:      req.body.author,
          description: req.body.description,
          price:       req.body.price,
          cover:       req.body.cover
        }
      },{new:true});
        res.status(200).json({ message: 'book updated' });
      
    }
  ));



















// //////////////////////////////////////////

/*
* @desc delete book by id
* @route /api/books/:id
* @method delete
* @access private
*/


  router.delete("/:id", verifyTokenAndAdmin,asyncHandler(
    async (req,res) => {
          const book = await Book.findById(req.params.id); 
      if (book) {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'book deleted' });
      } else {
        res.status(404).json({ message: 'book not found' });
      }
      
    }
  ));
  


    

module.exports = router


















