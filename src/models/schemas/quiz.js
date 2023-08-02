const { Schema } = require('mongoose');

const QuizSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    collection: 'Quiz',
    timestamps: true,
  },
);
module.exports = QuizSchema;
