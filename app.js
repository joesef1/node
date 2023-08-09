const express = require('express');
const app = express();
require('dotenv').config()
const logger = require('./middlewares/logger');
const {notFound,errorHanlder} = require('./middlewares/erorrs');
const connectToDB = require('./config/db');

app.use(logger);
app.use(express.json())
const Joi = require('joi');

connectToDB()

//routes
app.use("/api/books" , require('./routes/books'))
app.use("/api/authors" , require('./routes/authors'))
app.use("/api/auth" ,  require('./routes/auth'));
app.use("/api/users" ,   require('./routes/users'));

 // Error Hanlder Middleware
 app.use(notFound);
 app.use(errorHanlder);
  

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`));

