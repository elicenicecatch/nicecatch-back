const { quizService } = require('../services');

const quizController = {
  async getQuiz(req, res, next) {
    try {
      const quiz = await quizService.getQuiz();
      res.json(quiz);
    } catch (e) {
      next(e);
    }
  },

  async postQuiz(req, res, next) {
    try {
      const { item, image } = req.body;
      const quiz = await quizService.postQuiz({ item, image });
      res.status(201).json(quiz);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = quizController;
