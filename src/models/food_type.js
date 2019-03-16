const { Model, snakeCaseMappers } = require('objection');

class FoodType extends Model {
	static get columnNameMappers() {
		return snakeCaseMappers();
	}

	// Table name is the only required property.
	static get tableName() {
		return 'food_type';
	}
}

module.exports = FoodType;