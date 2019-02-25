const { Model } = require('objection');
const { getModelFile } = require('./helper');

class OrderDetail extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'order_detail';
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		return {
			food: {
				relation: Model.HasOneRelation,
				modelClass: getModelFile('food'),
				join: {
					from: 'order_detail.food_id',
					to: 'food.id'
				}
			},
			orderItem: {
				relation: Model.BelongsToOneRelation,
				modelClass: getModelFile('order_item'),
				join: {
					from: 'order_detail.order_item_id',
					to: 'order_item.id'
				}
			}
		};
	}
}

module.exports = OrderDetail;
