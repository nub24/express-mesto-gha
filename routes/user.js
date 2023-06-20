const userRouter = require('express').Router();
const { validationGetUserById, validationUpdateUser } = require('../middlewares/validation');

const {
  // createUser,
  getUsers,
  getUserById,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:_id', validationGetUserById, getUserById);
userRouter.patch('/me', validationUpdateUser, updateProfile);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
