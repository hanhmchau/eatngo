const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const loadKey = async (public, private) => {
	const publicKey = await readFile(public);
	const privateKey = await readFile(private);
	process.env.PUBLIC = publicKey;
	process.env.PRIVATE = privateKey;
};

module.exports = loadKey;