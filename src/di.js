const awilix = require('awilix');

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer();
const path = require('path');
const camelCase = require('camelcase');

const register = modules => {
	container.loadModules(modules, {
		formatName: (name, descriptor) => {
			const splat = descriptor.path.split(path.sep);
			const namespace = splat[splat.length - 2];
			const identity = `${name}_${namespace.substring(0, namespace.length - 1)}`;
			return camelCase(identity);
		},
		resolverOptions: {
			register: awilix.asClass
		}
	});
};

module.exports = {
	container,
	register
};
