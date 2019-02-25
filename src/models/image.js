const { Model } = require('objection');

class Image extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'food_image';
	}
}

module.exports = Image;
