const { Schema } = require('mongoose');

const RoomSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    size: {
      type: Number,
      required: true,
      default: 0,
    },
    mode: {
      type: String,
      default: 'together',
      enum: ['together', 'alone'],
    },
    password: {
      type: String,
    },
    participants: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    collection: 'Room',
    timestamps: true,
  },
);

module.exports = RoomSchema;
