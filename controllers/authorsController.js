const asyncHandler = require("express-async-handler");
const {Author , validateUpdateAuthor, validateCreateAuthor} = require("../models/Author");
const { model } = require("mongoose");



/*
* @desc get all authors
* @route /api/authors
* @method get
* @access public
*/
const getAllAuthors = asyncHandler(
  async (req, res) => {
    const {pageNumber} = req.query;
    const authorPerPage = 2;
      const authorList =await Author.find()
      .skip((pageNumber -1) * authorPerPage)
      .limit(authorPerPage);
    res.status(200).json(authorList);    
  }
)


/**  
* @desc get one author by id
* @route /api/authors/:id
* @method get
* @access private
*/
const getAuthorById = asyncHandler(
  async (req, res) => {
      const author = await Author.findById(req.params.id);
      if (author) {
        res.status(200).json(author);
      } else {
        res.status(404).json({ message: 'author not found' });
      }
    }
)

/*
* @desc create author
* @route /api/authors
* @method post
* @access public
*/

const createAuthor = asyncHandler(
  async (req,res) => {
    const { error } = validateCreateAuthor(req.body) ;
      if(error) {
      return res.status(400).json({ message: error.details[0].message });
      }

    const author = new Author({
      firstName:   req.body.firstName,
      secondName:  req.body.secondName,
      nationality: req.body.nationality,
      image:       req.body.image,
      });      
      const result =await author.save()    
      res.status(201).json(result);
    }
  
)

/*
* @desc update one author by id
* @route /api/authors/:id
* @method put
* @access public
*/
const updateAuthorById =  asyncHandler(
  async (req, res) => {
    const { error } = validateUpdateAuthor(req.body);  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
        const author = await Author.findByIdAndUpdate(
        req.params.id,{
      $set:{
        firstName : req.body.firstName,
        secondName : req.body.secondName,
        nationality : req.body.nationality,
        image : req.body.image
      }
    },{new:true});
      res.status(200).json({ message: 'author updated' });
    
  }
)


/*
* @desc get one author by id
* @route /api/authors/:id
* @method delete
* @access private
*/
const deleteAuthor = asyncHandler(
  async (req,res) => {
        const author = await Author.findById(req.params.id); 
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'author deleted' });
    } else {
      res.status(404).json({ message: 'author not found' });
    }    
  }
)

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthorById,
  deleteAuthor
}