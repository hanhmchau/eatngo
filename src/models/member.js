const { Model, snakeCaseMappers } = require('objection');
const { getModelFile } = require('./helper');

class Member extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'member';
	}

	static get columnNameMappers() {
		return snakeCaseMappers();
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		return {
			brandsCreated: {
				relation: Model.HasManyRelation,
				modelClass: getModelFile('brand'),
				join: {
					from: 'member.id',
					to: 'brand.creator_id'
				}
			},
			brandsManaged: {
				relation: Model.ManyToManyRelation,
				modelClass: getModelFile('brand'),
				join: {
					from: 'member.id',
					through: {
						from: 'brand_manager.member_id',
						to: 'brand_manager.brand_id'
					},
					to: 'brand.id'
				}
			},
			storesEmployedIn: {
				relation: Model.ManyToManyRelation,
				modelClass: getModelFile('store'),
				join: {
					from: 'member.id',
					through: {
						from: 'store_employee.member_id',
						to: 'store_employee.store_id'
					},
					to: 'store.id'
				}
			},
			orderItems: {
				relation: Model.HasManyRelation,
				modelClass: getModelFile('order_item'),
				join: {
					from: 'member.id',
					to: 'order_item.member_id'
				}
			}
		};
	}
}

module.exports = Member;
