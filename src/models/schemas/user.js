const { Schema } = require('mongoose');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    nickName: {
      required: true,
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  {
    collection: 'User',
    timestamps: true,
  },
);

module.exports = UserSchema;
