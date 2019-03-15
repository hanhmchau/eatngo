const OrderItem = require('../models/order_item');
const { transaction } = require('objection');
const epoch = new Date(0);

class OrderItemService {
	async getOrders(
		isCancelled = false,
		after = epoch,
		before = new Date(),
		page = 1,
		pageSize = 10
	) {
		return OrderItem.query()
			.where('is_cancelled', isCancelled)
			.andWhere('date', '>', after)
			.andWhere('date', '<', before)
			.eager('[orderDetails.[food.[images]], store.[brand], member]')
			.modifyEager('member', builder =>
				builder.select(['id', 'email', 'name', 'address', 'phone_number'])
			)
			.offset((page - 1) * pageSize)
			.limit(pageSize);
	}
	async getOrdersByMember(
		memberId,
		isCancelled = false,
		after = epoch,
		before = new Date(),
		page = 1,
		pageSize = 10
	) {
		return OrderItem.query()
			.where('is_cancelled', isCancelled)
			.andWhere('date', '>', after)
			.andWhere('date', '<', before)
			.andWhere('member_id', memberId)
			.eager('[orderDetails.[food.[images]], store.[brand]]')
			.modifyEager('member', builder =>
				builder.select(['id', 'email', 'name', 'address', 'phone_number'])
			)
			.offset((page - 1) * pageSize)
			.limit(pageSize);
	}
	async getOrdersByBrand(
		brandId,
		isCancelled = false,
		after = epoch,
		before = new Date(),
		page = 1,
		pageSize = 10
	) {
		return OrderItem.query()
			.where('is_cancelled', isCancelled)
			.andWhere('date', '>', after)
			.andWhere('date', '<', before)
			.andWhere('brand_id', brandId)
			.eager('[orderDetails.[food.[images]], store.[brand], member]')
			.modifyEager('member', builder =>
				builder.select(['id', 'email', 'name', 'address', 'phone_number'])
			)
			.offset((page - 1) * pageSize)
			.limit(pageSize);
	}
	async getOrdersByStore(
		storeId,
		isCancelled = false,
		after = epoch,
		before = new Date(),
		page = 1,
		pageSize = 10
	) {
		return OrderItem.query()
			.where('is_cancelled', isCancelled)
			.andWhere('date', '>', after)
			.andWhere('date', '<', before)
			.andWhere('store_id', storeId)
			.eager('[orderDetails.[food.[images]], member]')
			.modifyEager('member', builder =>
				builder.select(['id', 'email', 'name', 'address', 'phone_number'])
			)
			.offset((page - 1) * pageSize)
			.limit(pageSize);
	}
	async getOrderById(id) {
		return await OrderItem.query()
			.where('id', id)
			.eager('[orderDetails.[food.[images]], store.[brand], member]')
			.modifyEager('member', builder =>
				builder.select(['id', 'email', 'name', 'address', 'phone_number'])
			)
			.first();
	}
	async createOrder(order) {
		const orderItem = await transaction(
			OrderItem.knex(),
			async trx => await OrderItem.query(trx).insertGraph(order)
		);
		return this.getOrderById(orderItem.id);
	}
	async updateOrder(id, order) {
		order.id = id;
		const orderItem = await transaction(
			OrderItem.knex(),
			async trx => await OrderItem.query(trx).upsertGraphAndFetch(order)
		);
		return this.getOrderById(orderItem.id);
	}
	async cancelOrder(id) {
		return OrderItem.query().patchAndFetchById(id, {
			isCancelled: true
		});
	}
}

module.exports = OrderItemService;
