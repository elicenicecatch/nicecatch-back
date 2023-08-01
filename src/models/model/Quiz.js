const mongoose = require('mongoose');
const { QuizSchema } = require('../schemas');

const Quiz = mongoose.model('Quiz', QuizSchema);

const quizDAO = {
  async createQuiz(toCreate) {
    const quiz = await Quiz.create(toCreate);
    return quiz;
  },

  async findOne() {
    const quiz = await Quiz.aggregate([{ $sample: { size: 1 } }]);
    return quiz;
  },
};

module.exports = quizDAO;
