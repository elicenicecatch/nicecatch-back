const { roomDAO } = require('../models/model');

const roomService = {
  async getRooms() {
    const rooms = await roomDAO.findAll();
    return rooms;
  },

  async getRoom(id) {
    const room = await roomDAO.findOneById(id);
    return room;
  },

  async createRoom(toCreate) {
    const room = await roomDAO.createRoom(toCreate);
    return room;
  },

  async updateRoomIn(id, participant) {
    if ((await roomDAO.findRoomByUser(id, participant)).length > 0)
      throw Error('해당 방에 이미 참여 중 입니다.');
    const room = await roomDAO.updateRoomInById(id, participant);
    return room;
  },

  async updateRoomOut(id, participant) {
    if ((await roomDAO.findRoomByUser(id, participant)).length < 1)
      throw Error('해당 방에 참여하고 있지 않습니다');
    const room = await roomDAO.updateRoomOutById(id, participant);
    return room;
  },

  async deleteRoom(id) {
    const room = await roomDAO.deleteOneById(id);
    return room;
  },
};

module.exports = roomService;
