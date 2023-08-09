const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
 const logger = require('./middlewares/logger');
const {notFound,errorHanlder} = require('./middlewares/erorrs');


mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("Connected To MongoDB..."))
.catch((error) => console.log("Connection Failed To MongoDB!", error));



const bookspath = require('./routes/books');
const authorspath = require('./routes/authors');
const authpath = require('./routes/auth');
const userspath = require('./routes/users');

app.use(logger);
app.use(express.json())
const Joi = require('joi');

//routes
app.use("/api/books" , bookspath)
app.use("/api/authors" , authorspath)
app.use("/api/auth" , authpath);
app.use("/api/users" , userspath);

 // Error Hanlder Middleware
 app.use(notFound);
 app.use(errorHanlder);
  

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`));

