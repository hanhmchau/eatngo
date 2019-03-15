const { Model, snakeCaseMappers } = require('objection');

class Image extends Model {
	static get columnNameMappers() {
		return snakeCaseMappers();
	}

	// Table name is the only required property.
	static get tableName() {
		return 'food_image';
	}
}

module.exports = Image;
