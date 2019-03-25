const { Model, snakeCaseMappers } = require('objection');
const { getModelFile } = require('./helper');

class Brand extends Model {
	static get columnNameMappers() {
		// If your columns are UPPER_SNAKE_CASE you can
		// use snakeCaseMappers({ upperCase: true })
		return snakeCaseMappers();
	}

	// Table name is the only required property.
	static get tableName() {
		return 'brand';
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		return {
			stores: {
				relation: Model.HasManyRelation,
				// The related model. This can be either a Model subclass constructor or an
				// absolute file path to a module that exports one. We use the file path version
				// here to prevent require loops.
				modelClass: getModelFile('store'),
				join: {
					from: 'brand.id',
					to: 'store.brand_id'
				}
			},
			managers: {
				relation: Model.ManyToManyRelation,
				modelClass: getModelFile('member'),
				join: {
					from: 'brand.id',
					through: {
						from: 'brand_manager.brand_id',
						to: 'brand_manager.member_id'
					},
					to: 'member.id'
				}
			},
			creator: {
				relation: Model.BelongsToOneRelation,
				modelClass: getModelFile('member'),
				join: {
					from: 'brand.creator_id',
					to: 'member.id'
				}
			},
			foods: {
				relation: Model.HasManyRelation,
				modelClass: getModelFile('food'),
				join: {
					from: 'brand.id',
					to: 'food.brand_id'
				}
			},
			promotionCodes: {
				relation: Model.HasManyRelation,
				modelClass: getModelFile('promotion_code'),
				join: {
					from: 'brand.id',
					to: 'promotion_code.brand_id'
				}
			}
		};
	}
}

module.exports = Brand;
