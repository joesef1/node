const { Book } = require("./models/Book") ;
const { books } = require("./data");

//authors
const { Author } = require("./models/Author") ;
const { authors } = require("./data");


const connectToDb = require("./config/db");
require("dotenv").config();

// connect To Db
connectToDb();

// import book (seeding db)
const importBooks = async()=> {
  try {
    await Book.insertMany(books);
    console.log("book inserted");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// import book (seeding db)
const importAuthors = async()=> {
  try {
    await Author.insertMany(authors);
    console.log("authors inserted");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}


// remove

const removeBooks = async()=> {
  try {
    await Book.deleteMany(books);
    console.log("book removed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}


if (process.argv[2] === "-import") {
  importBooks();
}else if (process.argv[2] === "-remove"){
  removeBooks();
}else if (process.argv[2] === "-import-authors"){
  importAuthors();
}