const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {Author} = require("../models/Author");



const authors = [
  {
    id: '1',
    firstName: 'joe',
    secondName: 'yousef',
    nationality: 'egypt',
    image: ''
  },
  
];


/*
* @desc get all authors
* @route /api/authors
* @method get
* @access public
*/
router.get('/', (req, res) => {
  res.status(200).json(authors);
});


/*
* @desc get one author by id
* @route /api/authors/:id
* @method get
* @access public
*/
router.get('/:id', (req, res) => {
  const author = authors.find(b => b.id === req.params.id); // No need to parse id as it's a string
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: 'author not found' });
  }
});


/*
* @desc create author
* @route /api/authors
* @method post
* @access public
*/
router.post("/", (req,res) => {
  const { error } = validateCreateAuthor(req.body) ;

    if(error) {
    return res.status(400).json({ message: error.details[0].message });
    }
  

  
  const author = {
  id:          authors.length + 1,
  firstName:   req.body.firstName,
  secondName:  req.body.secondName,
  nationality: req.body.nationality,
  image:       req.body.image,
  }
  
  authors.push(author)
  res.status(201).json(author); // 201 => created successfully
  });

function validateCreateAuthor(obj) {
    const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200).required(),
    secondName: Joi.string().trim().min(3).max(200).required(),
    nationality: Joi.string().trim().min(3).max(200),
    image: Joi.string(),
  })

    return schema.validate(obj) ;
}


// Update Author
router.put("/:id", (req, res) => {
  const { error } = validateUpdateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const author = authors.find(b => b.id === req.params.id);

  if (author) {
    // Update author properties
    author.firstName = req.body.firstName;
    author.secondName = req.body.secondName;
    author.nationality = req.body.nationality;
    author.image = req.body.image;

    res.status(200).json({ message: 'author updated' });
  } else {
    res.status(404).json({ message: 'author not found' });
  }
});


function validateUpdateAuthor(obj) {
  const schema = Joi.object({
  firstName: Joi.string().trim().min(3).max(200),
  secondName: Joi.string().trim().min(3).max(200),
  nationality: Joi.string().trim().min(3).max(200),
  image: Joi.string(),
})

  return schema.validate(obj) ;
}




router.delete("/:id", (req,res) => {

  const author = authors.find(b => b.id === req.params.id); // No need to parse id as it's a string
  if (author) {
    res.status(200).json({ message: 'author deleted' });
  } else {
    res.status(404).json({ message: 'author not found' });
  }

});




    

module.exports = router


















