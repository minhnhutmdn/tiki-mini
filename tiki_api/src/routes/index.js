import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import product from '../controller/product';
var cors = require('cors');

let router = express();

// connect to db
initializeDb(db => {

  // use it before all route definitions
  router.use(cors({origin: 'http://localhost:8080'}));

  // internal middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/v1)
  router.use('/product', product({ config, db }));
});

export default router;
