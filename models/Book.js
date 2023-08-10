const mongoose = require("mongoose")
const Joi = require('joi');



const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength:3,
    maxlength:250,
},
author: {
  type: mongoose.Schema.ObjectId,
  required: true,
  ref: "Author",

},

description: {
  type: String,
  required: true,
  trim: true,
},

cover: {
  type: String,
  required: true,
  enum: ["soft cover","hard cover"],
},

price: {
  type: Number,
  required: true,
  min: 0,
},
},{
  timestamps: true
})


const Book = mongoose.model("Book", BookSchema);




function validateUpdateBook(obj) {
  const schema = Joi.object({
  title: Joi.string().trim().min(3).max(250),
  author: Joi.string(),
  description: Joi.string().trim().min(3),
  cover: Joi.string().valid("soft-cover","hard cover"),
  price: Joi.number().min(0),
})

  return schema.validate(obj) ;
}


function validateCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250).required(),
    author: Joi.string().required(),
    description: Joi.string().trim().min(3).required(),
    cover: Joi.string().valid("soft-cover","hard cover").required(),
    price: Joi.number().min(0).required(),
})

  return schema.validate(obj) ;
}





module.exports = {
  Book,
  validateCreateBook,
  validateUpdateBook
}