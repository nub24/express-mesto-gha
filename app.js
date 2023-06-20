const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { ERROR_INTERNAL_SERVER } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log(`DB error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/', router);

app.use((err, _, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === ERROR_INTERNAL_SERVER ? 'Ошибка на сервере' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log('Server ok');
});
