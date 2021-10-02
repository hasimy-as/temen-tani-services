const cors = require('cors');
const http = require('http');
const express = require('express');
const validate = require('validate.js');

const routes = require('./api/index');
const connectDB = require('./database/db');
const logger = require('./helpers/lib/logger');
const config = require('./helpers/config/config');
const { CODE } = require('./helpers/lib/httpCode');
const response = require('./helpers/utils/response');

const app = express();
const server = http.createServer(app);
const PORT = !validate.isEmpty(process.env.PORT) ? config.get('/port') : 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);
app.get('/', (req, res) => response.data(res, 'OK', 'OK'));

app.get('*', (req, res) => {
  logger.error('server', 'Undefined accessed.');
  return response.error(res, 'Cannot get undefined endpoint!', CODE.NOT_FOUND);
});

server.listen(PORT, async (err) => {
  const cx = 'server-listen';
  if (err) {
    logger.error(cx, err);
    return process.exit(1);
  }

  await connectDB(config.get('/mongo_uri'));
  logger.info(cx, `Connected to port:${PORT}`);
});
