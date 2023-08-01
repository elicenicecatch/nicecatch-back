const { Router } = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const quizRouter = require('./quizRouter');
const { loginRequired } = require('../middlewares');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', loginRequired, userRouter);
router.use('/quiz', loginRequired, quizRouter);

module.exports = { router };
