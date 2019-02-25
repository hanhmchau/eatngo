const { Model } = require('objection');
const { getModelFile } = require('./helper');

class Food extends Model {
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
			}
		};
	}
}

module.exports = Food;
