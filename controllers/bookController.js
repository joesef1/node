const asyncHandler = require("express-async-handler");
const {validateCreateBook,validateUpdateBook, Book} = require("../models/Book");


/*
* @desc get all books
* @route /api/books
* @method get
* @access public
*/
const getAllBooks =  asyncHandler(
  async (req, res) => {
    // Comparison Query Operators
    // $eq (equal)
    // $ne (not equal)
    // $lt (less than equal)
    // $lte (less than and equal )
    // $gt (greater than )
    // $gte (greater than and equal)
    // $in [8,9] (get with price 8 and 9)


    const {minPrice, maxPrice} = req.query
      let books;
    if (minPrice && maxPrice) {
        books =await Book.find({price: {$gte: minPrice , $lte: maxPrice}})
      .populate("author", ["firstName"])
    res.status(200).json(books);  
    }else{
        books =await Book.find()
      .populate("author", ["firstName"])
    res.status(200).json(books);  
    }
      
  }
)





/*
* @desc get one book by id
* @route /api/books/:id
* @method get
* @access public
*/
const getBookById = asyncHandler(
  async (req, res) => {  
      const book = await Book.findById(req.params.id);
      if (Book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: 'book not found' });
      }
    }
)






/*
* @desc create book
* @route /api/books
* @method post
* @access private
*/
const createBook = asyncHandler(
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
)







/*
* @desc update book by id
* @route /api/books/:id
* @method put
* @access private
*/
const updateBookById = asyncHandler(
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
)



/*
* @desc delete book by id
* @route /api/books/:id
* @method delete
* @access private
*/



const deleteBook = asyncHandler(
  async (req,res) => {
        const book = await Book.findById(req.params.id); 
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'book deleted' });
    } else {
      res.status(404).json({ message: 'book not found' });
    }
    
  }
)

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBook
}