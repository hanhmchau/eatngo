const { Model } = require('objection');
const { getModelFile } = require('./helper');

class Store extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'store';
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		return {
			brand: {
				relation: Model.BelongsToOneRelation,
				// The related model. This can be either a Model subclass constructor or an
				// absolute file path to a module that exports one. We use the file path version
				// here to prevent require loops.
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
