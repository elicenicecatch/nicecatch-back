const mongoose = require('mongoose');
const { RoomSchema } = require('../schemas');

const Room = mongoose.model('Room', RoomSchema);

const roomDAO = {
  async findAll() {
    const rooms = await Room.find({}).lean();
    return rooms;
  },

  async findOneById(id) {
    const room = await Room.find({ id }).lean();
    return room;
  },

  async findRoomByUser(id, email) {
    const room = await Room.find({ id, participants: email });
    return room;
  },

  async createRoom(toCreate) {
    const room = await Room.create(toCreate);
    return room;
  },

  async updateRoomInById(id, participant) {
    const room = await Room.findOneAndUpdate(
      { id },
      {
        $inc: { size: 1 },
        $push: {
          participants: participant,
        },
      },
      { new: true },
    ).lean();
    return room;
  },

  async updateRoomOutById(id, participant) {
    const room = await Room.findOneAndUpdate(
      { id },
      {
        $inc: { size: -1 },
        $pull: {
          participants: participant,
        },
      },
      { new: true },
    ).lean();
    return room;
  },

  async deleteOneById(id) {
    const room = await Room.deleteOne({ id }).lean();
    return room;
  },
};

module.exports = roomDAO;
