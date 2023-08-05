
const express = require('express');
const app = express();

const bookspath = require('./routes/books');

app.use(express.json())
const Joi = require('joi');


app.use("/api/books" , bookspath)



app.listen(5000, () => {
  console.log('server is listening on port 5000...');
});
