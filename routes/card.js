const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:_id', deleteCard);
router.put('/:_id/likes', likeCard);
router.delete('/:_id/likes', dislikeCard);

module.exports = router;
