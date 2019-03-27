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
app.use(
	express.urlencoded({
		extended: false
	})
);
app.use(cookieParser());
app.use(compression());

const di = require('./src/di');
di.register(['src/services/**/*.js', 'src/controllers/**/*.js']);

const loadKeys = require('./src/key');
(async () => {
	await loadKeys('./keys/public.pem', './keys/private.pem');
})();

const router = require('./src/routes');
app.use('/api', router);

/* SWAGGER CONFIG */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/* END SWAGGER CONFIG */

/* FIREBASE CONFIG */
const configureFirebase = require('./src/firebase');
configureFirebase();
/* END FIREBASE CONFIG */

app.listen(5000);
