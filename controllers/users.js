const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => {
      res.send({ data: user })
    })
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }))
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(() => res.status(401).send({ message: 'Произошла ошибка' }));
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}