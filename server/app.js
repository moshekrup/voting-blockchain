const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { isDevelopment } = require('./config');

const createApp = () => {
  const app = express();
  
  app.use(bodyParser.json({limit: '10mb'}));
  
  if (isDevelopment) {
    const corsOptions = {
      origin: '*',
      methods: 'GET,PUT,POST,DELETE',
      allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept',
    };
    app.use(cors(corsOptions));
  }
  
  app.get('/candidates', require('./controllers/candidates'));
  app.post('/vote', require('./controllers/vote'));

  app.use((err, req, res, next) => {
    console.log(err);
  });
  
  return app;
};

module.exports = {createApp};