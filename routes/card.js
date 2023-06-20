const cardRouter = require('express').Router();
const { validationCreateCard } = require('../middlewares/validation');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

cardRouter.get('/', getCards);
cardRouter.post('/', validationCreateCard, createCard);
cardRouter.delete('/:_id', deleteCard);
cardRouter.put('/:_id/likes', likeCard);
cardRouter.delete('/:_id/likes', dislikeCard);

module.exports = cardRouter;
