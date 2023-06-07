const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/card');
const router = require('express').Router();

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:_id', deleteCard);
router.put('/:_id/likes', likeCard);
router.delete('/:_id/likes', dislikeCard);

module.exports = router;