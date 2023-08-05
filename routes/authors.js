const express = require('express');
const router = express.Router();

const {Author , validateUpdateAuthor, validateCreateAuthor} = require("../models/Author");


/*
* @desc get all authors
* @route /api/authors
* @method get
* @access public
*/
router.get('/', async (req, res) => {

  try {
    const authorList =await Author.find()
  res.status(200).json(authorList);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"erorr"})
  }
    
});


/*
* @desc get one author by id
* @route /api/authors/:id
* @method get
* @access public
*/
router.get('/:id', async (req, res) => {
try {
  const author = await Author.findById(req.params.id);
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: 'author not found' });
  }
} catch (error) {
  console.log(error);
    res.status(500).json({message:"erorr"})
}
});


/*
* @desc create author
* @route /api/authors
* @method post
* @access public
*/
router.post("/", async (req,res) => {
  const { error } = validateCreateAuthor(req.body) ;

    if(error) {
    return res.status(400).json({ message: error.details[0].message });
    }
  

  try {
  const author = new Author({
    firstName:   req.body.firstName,
    secondName:  req.body.secondName,
    nationality: req.body.nationality,
    image:       req.body.image,
    });
    
    const result =await author.save()
    
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"erorr"})
  }

  });


/*
* @desc get one author by id
* @route /api/authors/:id
* @method put
* @access public
*/
router.put("/:id", async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }


  try {
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

  } catch (error) {
    res.status(500).json({message:"erorr"})
  }

  
});


/*
* @desc get one author by id
* @route /api/authors/:id
* @method delete
* @access public
*/
router.delete("/:id", async (req,res) => {

  try {
      const author = await Author.findById(req.params.id); 
  if (author) {
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'author deleted' });
  } else {
    res.status(404).json({ message: 'author not found' });
  }
  } catch (error) {
    res.status(500).json({message:"erorr"})
  }

});

module.exports = router


















