const { Router } = require('express');
const { quizController } = require('../controllers');

const quizRouter = Router();

quizRouter.get('/', quizController.getQuiz);
quizRouter.post('/', quizController.postQuiz);

module.exports = quizRouter;
