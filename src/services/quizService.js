const { quizDAO } = require('../models/model');

const quizService = {
  async getQuiz() {
    const quiz = quizDAO.findOne();
    return quiz;
  },

  async postQuiz(toPost) {
    const quiz = quizDAO.createQuiz(toPost);
    return quiz;
  },
};

module.exports = quizService;
