const server = require('./src/app');

const PORT = process.env.SERVER_PORT || 3001;
const HOST = process.env.HOST || 'http://localhost';

server.listen(PORT, () => {
  console.log(`🚀Server on → ${HOST}:${PORT}`);
});
