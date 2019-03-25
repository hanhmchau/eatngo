const { Model, snakeCaseMappers } = require('objection');
const { getModelFile } = require('./helper');

class PromotionCampaign extends Model {
	static get columnNameMappers() {
		// If your columns are UPPER_SNAKE_CASE you can
		// use snakeCaseMappers({ upperCase: true })
		return snakeCaseMappers();
	}

	// Table name is the only required property.
	static get tableName() {
		return 'promotion_code';
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		return {
			brand: {
				relation: Model.BelongsToOneRelation,
				modelClass: getModelFile('brand'),
				join: {
					from: 'promotion_code.id',
					to: 'brand.id'
				}
			}
		};
	}
}

module.exports = PromotionCampaign;
