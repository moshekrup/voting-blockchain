const { port } = require('./config');
const dbDriver = require('./db/mongodb');
const { createWebSocketServer } = require('./webSocket');
const { createApp } = require('./app');

async function main() {
  await dbDriver.ensureIndex("data.event.geoJson");
  
  const app = createApp();
  await app.listen(port, () => {
    console.info('Server is listening on port %d', port)
  });
  
  createWebSocketServer();
}

main().catch((err) => {
  console.error("error occurred", err);
})
  