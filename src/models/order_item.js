const { Model, snakeCaseMappers } = require('objection');
const { getModelFile } = require('./helper');

class OrderItem extends Model {
	static get columnNameMappers() {
		return snakeCaseMappers();
	}

	// Table name is the only required property.
	static get tableName() {
		return 'order_item';
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		return {
			store: {
				relation: Model.BelongsToOneRelation,
				modelClass: getModelFile('store'),
				join: {
					from: 'order_item.store_id',
					to: 'store.id'
				}
			},
			member: {
				relation: Model.BelongsToOneRelation,
				modelClass: getModelFile('member'),
				join: {
					from: 'order_item.member_id',
					to: 'member.id'
				}
			},
			promotionCode: {
				relation: Model.HasOneRelation,
				modelClass: getModelFile('promotion_code'),
				join: {
					from: 'order_item.promotion_code_id',
					to: 'promotion_code.id'
				}
			},
			orderDetails: {
				relation: Model.HasManyRelation,
				modelClass: getModelFile('order_detail'),
				join: {
					from: 'order_item.id',
					to: 'order_detail.order_item_id'
				}
			}
		};
	}
}

module.exports = OrderItem;
