const { Router } = require('express');
const { roomController } = require('../controllers');

const roomRouter = Router();

roomRouter.get('/', roomController.getRooms);
roomRouter.get('/info', roomController.getRoom);
roomRouter.post('/', roomController.postRoom);
roomRouter.put('/:roomId/in', roomController.putRoomIn);
roomRouter.put('/:roomId/out', roomController.putRoomOut);
roomRouter.delete('/:roomId', roomController.deleteRoom);

module.exports = roomRouter;
