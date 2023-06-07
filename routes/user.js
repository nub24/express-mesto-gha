const {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar
} = require('../controllers/users');
const router = require('express').Router();

router.get('/', getUsers);
router.get('/:_id', getUserById);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);


module.exports = router;