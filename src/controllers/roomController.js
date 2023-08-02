const { roomService } = require('../services');

const roomController = {
  async getRooms(req, res, next) {
    try {
      const rooms = await roomService.getRooms();
      res.json(rooms);
    } catch (e) {
      next(e);
    }
  },

  async getRoom(req, res, next) {
    try {
      const { roomId: id } = req.query;
      const room = await roomService.getRoom(id);
      res.json(room);
    } catch (e) {
      next(e);
    }
  },

  async postRoom(req, res, next) {
    try {
      const { id, mode, password } = req.body;
      const room = await roomService.createRoom({ id, mode, password });
      res.status(201).json(room);
    } catch (e) {
      next(e);
    }
  },

  async putRoomIn(req, res, next) {
    try {
      const { roomId: id } = req.params;
      const { participant } = req.body;
      const room = await roomService.updateRoomIn(id, participant);
      res.status(201).json(room);
    } catch (e) {
      next(e);
    }
  },

  async putRoomOut(req, res, next) {
    try {
      const { roomId: id } = req.params;
      const { participant } = req.body;
      const room = await roomService.updateRoomOut(id, participant);
      res.status(201).json(room);
    } catch (e) {
      next(e);
    }
  },

  async deleteRoom(req, res, next) {
    try {
      const { roomId: id } = req.params;
      const room = await roomService.deleteRoom(id);
      res.json(room);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = roomController;
