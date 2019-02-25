module.exports = {
	development: {
		client: 'pg',
		useNullAsDefault: true,
		connection: {
			port: '5432',
			host: 'localhost',
			database: 'noqueuedb',
			user: 'postgres',
			password: '1234'
		},
		pool: {
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'example'
		},
		pool: {
			min: 2,
			max: 10
		}
	}
};
