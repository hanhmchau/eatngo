const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

/* KNEX CONFIG */
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./src/knexfile');
const knex = Knex(knexConfig.development);
Model.knex(knex);
/* ============ */

/* PROCESS_ENV CONFIG */
require('dotenv').config();
/* ============ */

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(compression());

const router = require('./src/controllers');
app.use(router);

app.listen(5000);
