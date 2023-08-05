const express = require('express');
const router = express.Router();
const Joi = require('joi');



const books = [
  {
    id: '1',
    title: 'book1'
  },
  {
    id: '2', // Use a different id for the second book
    title: 'book2'
  }
];


/*
* @desc get all books
* @route /api/books
* @method get
* @access public
*/
router.get('/', (req, res) => {
  res.status(200).json(books);
});


/*
* @desc get one book by id
* @route /api/books/:id
* @method get
* @access public
*/
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id); // No need to parse id as it's a string
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'book not found' });
  }
});


/*
* @desc create book
* @route /api/books
* @method post
* @access public
*/
router.post("/", (req,res) => {
  const { error } = validateCreateBook(req.body) ;

    if(error) {
    return res.status(400).json({ message: error.details[0].message });
    }
  

  
  const book = {
  id:          books.length + 1,
  title:       req.body.title,
  author:      req.body.author,
  description: req.body.description,
  price:       req.body.price,
  cover:       req.body.cover
  }
  
  books.push(book)
  res.status(201).json(book); // 201 => created successfully
  });

function validateCreateBook(obj) {
    const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(3).max(500).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim().required(),
  })

    return schema.validate(obj) ;
}
// //////////////////////////////////////////

/*
* @desc update book by id
* @route /api/books/:id
* @method put
* @access public
*/

router.put("/:id", (req,res) => {
  const { error } = validateUpdateBook(req.body) ;

    if(error) {
    return res.status(400).json({ message: error.details[0].message });
    }

    const book = books.find(b => b.id === req.params.id); // No need to parse id as it's a string
    if (book) {
      res.status(200).json({ message: 'book updated' });
    } else {
      res.status(404).json({ message: 'book not found' });
    }
  
  
  

  
  });

function validateUpdateBook(obj) {
    const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200),
    author: Joi.string().trim().min(3).max(200),
    description: Joi.string().trim().min(3).max(500),
    price: Joi.number().min(0),
    cover: Joi.string().trim(),
  })
    return schema.validate(obj) ;
}





// //////////////////////////////////////////

/*
* @desc delete book by id
* @route /api/books/:id
* @method delete
* @access public
*/

router.delete("/:id", (req,res) => {

    const book = books.find(b => b.id === req.params.id); // No need to parse id as it's a string
    if (book) {
      res.status(200).json({ message: 'book deleted' });
    } else {
      res.status(404).json({ message: 'book not found' });
    }
  
  });


    

module.exports = router


















