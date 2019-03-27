const admin = require('firebase-admin');

const configureFirebase = () => {
	const serviceAccount = require('../keys/eatngo-a7c8f-firebase-adminsdk-96955-cb9c82c460.json');
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: 'https://eatngo-a7c8f.firebaseio.com'
	});
};

module.exports = configureFirebase;
