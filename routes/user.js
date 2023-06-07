const { createUser, getUsers, getUserById } = require('../controllers/users');
const userRouter = require('express').Router();

userRouter.get('/', getUsers)
userRouter.get('/:_id', getUserById)
userRouter.post('/', createUser);


module.exports = userRouter;