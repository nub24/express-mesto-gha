const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(401).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  const cardId = req.params._id;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      res.send({ data: card });
    })
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => {
  const cardId = req.params._id;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      res.send({ data: card });
    })
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.dislikeCard = (req, res) => {
  const cardId = req.params._id;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      res.send({ data: card });
    })
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};
