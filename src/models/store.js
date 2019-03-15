const { Model, snakeCaseMappers } = require('objection');
const { getModelFile } = require('./helper');

class Store extends Model {
	static get columnNameMappers() {
		return snakeCaseMappers();
	}

	// Table name is the only required property.
	static get tableName() {
		return 'store';
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		return {
			brand: {
				relation: Model.BelongsToOneRelation,
				modelClass: getModelFile('brand'),
				join: {
					from: 'store.brand_id',
					to: 'brand.id'
				}
			},
			employees: {
				relation: Model.ManyToManyRelation,
				modelClass: getModelFile('member'),
				join: {
					from: 'store.id',
					through: {
						from: 'store_employee.store_id',
						to: 'store_employee.member_id'
					},
					to: 'member.id'
				}
			},
			orderItems: {
				relation: Model.HasManyRelation,
				modelClass: getModelFile('order_item'),
				join: {
					from: 'store.id',
					to: 'order_item.store_id'
				}
			}
		};
	}
}

module.exports = Store;
