
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


//Routes
app.use(express.json())
app.use(logger);
  

// Error Hanlder Middleware
app.use(notFound);
app.use(errorHanlder);
  
  


app.use("/api/books" , bookspath)
app.use("/api/authors" , authorspath)


const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`));
