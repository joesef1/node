
const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose
.connect("mongodb://localhost/bookStoreDB")
.then(() => console.log("Connected To MongoDB..."))
.catch((error) => console.log("Connection Failed To MongoDB!", error));




const bookspath = require('./routes/books');
const authorspath = require('./routes/authors');

app.use(express.json())
const Joi = require('joi');


app.use("/api/books" , bookspath)
app.use("/api/authors" , authorspath)



app.listen(5000, () => {
  console.log('server is listening on port 5000...');
});
