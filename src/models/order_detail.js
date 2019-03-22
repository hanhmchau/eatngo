const { Model, snakeCaseMappers } = require('objection');
const { getModelFile } = require('./helper');

class OrderDetail extends Model {
	static get columnNameMappers() {
		return snakeCaseMappers();
	}
	static get virtualAttributes() {
		return ['total'];
	}

	get total() {
		const attributes = this.attributes || [];
		let totalExtra = attributes.reduce(
			(prev, currentExtra) =>
				prev +
				currentExtra.options.reduce(
					(prev, currentOption) => prev + currentOption.price,
					0
				),
			0
		);
		return parseFloat(this.price) * this.quantity + totalExtra;
	}

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
