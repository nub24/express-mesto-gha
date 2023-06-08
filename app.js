const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log(`DB error: ${err}`))


const userRouter = require('./routes/user')
const cardRouter = require('./routes/card')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64809b00eac4a9db26d024e8'
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.listen(PORT, () => {
  console.log(`Server ok`)
})