const user = require('../models/user');
const {
  CREATED_CODE,
  ERROR_CODE,
  ERROR_INTERNAL_SERVER,
} = require('../utils/constants');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  user.create({ name, about, avatar })
    .then((userData) => {
      res
        .status(CREATED_CODE)
        .send({ data: userData });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при регистрации' });
      } else {
        res.status(ERROR_INTERNAL_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.getUsers = (req, res) => {
  user.find({})
    .then((userData) => res.send({ data: userData }))
    .catch(() => res.status(401).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  user.findById(req.params._id)
    .then((userData) => {
      if (!userData) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: userData });
    })
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  user.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((userData) => res.send({ data: userData }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  user.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((userData) => res.send({ data: userData }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
