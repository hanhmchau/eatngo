const { Model, snakeCaseMappers } = require('objection');
const { getModelFile } = require('./helper');

class Food extends Model {
	static get columnNameMappers() {
		// If your columns are UPPER_SNAKE_CASE you can
		// use snakeCaseMappers({ upperCase: true })
		return snakeCaseMappers();
	}

	// Table name is the only required property.
	static get tableName() {
		return 'food';
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		return {
			brand: {
				relation: Model.BelongsToOneRelation,
				modelClass: getModelFile('brand'),
				join: {
					from: 'food.brand_id',
					to: 'brand.id'
				}
			},
			extras: {
				relation: Model.ManyToManyRelation,
				modelClass: getModelFile('food'),
				join: {
					from: 'food.id',
					through: {
						from: 'food_extra.food_id',
						to: 'food_extra.extra_id'
					},
					to: 'food.id'
				}
			},
			images: {
				relation: Model.HasManyRelation,
				modelClass: getModelFile('image'),
				join: {
					from: 'food.id',
					to: 'food_image.food_id'
				}
			},
			type: {
				relation: Model.HasOneRelation,
				modelClass: getModelFile('food_type'),
				join: {
					from: 'food.type_id',
					to: 'food_type.id'
				}
			}
		};
	}
}

module.exports = Food;
