const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => {
      res.send({ data: user })
    })
    .catch(err => res.status(400).send({ message: 'Произошла ошибка' }))
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(() => res.status(401).send({ message: 'Произошла ошибка' }));
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .then(user => {
      if (!user) {
        res.status(404).send( {message: 'Пользователь не найден'})
      }
      return res.send({ data: user })})
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
}

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}