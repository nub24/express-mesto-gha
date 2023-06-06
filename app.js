const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err))


app.listen(PORT, () => {
  console.log(`Server ok`)
})