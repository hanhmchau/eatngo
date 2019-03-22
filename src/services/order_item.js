const OrderItem = require('../models/order_item');
const { transaction } = require('objection');
const epoch = new Date(0);

const filterStatus = (builder, status) => {
	if (status !== -1) {
		builder.andWhere('status', status);
	}
};

class OrderItemService {
	async getOrders(
		status = -1,
		after = epoch,
		before = new Date(),
		page = 1,
		pageSize = Number.MAX_VALUE
	) {
		return OrderItem.query()
			.where('date', '>', after)
			.andWhere('date', '<', before)
			.modify(builder => filterStatus(builder, status))
			.eager('[orderDetails.[food.[images]], store.[brand], member]')
			.modifyEager('member', builder =>
				builder.select(['id', 'email', 'name', 'address', 'phone_number'])
			)
			.offset((page - 1) * pageSize)
			.limit(pageSize);
	}
	async getOrdersByMember(
		status = -1,
		memberId,
		after = epoch,
		before = new Date(),
		page = 1,
		pageSize = Number.MAX_VALUE
	) {
		return OrderItem.query()
			.where('date', '>', after)
			.andWhere('date', '<', before)
			.andWhere('member_id', memberId)
			.modify(builder => filterStatus(builder, status))
			.eager('[orderDetails.[food.[images]], store.[brand]]')
			.modifyEager('member', builder =>
				builder.select(['id', 'email', 'name', 'address', 'phone_number'])
			)
			.offset((page - 1) * pageSize)
			.limit(pageSize);
	}
	async getOrdersByBrand(
		status = -1,
		brandId,
		after = epoch,
		before = new Date(),
		page = 1,
		pageSize = Number.MAX_VALUE
	) {
		return OrderItem.query()
			.where('date', '>', after)
			.andWhere('date', '<', before)
			.andWhere('brand_id', brandId)
			.modify(builder => filterStatus(builder, status))
			.eager('[orderDetails.[food.[images]], store.[brand], member]')
			.modifyEager('member', builder =>
				builder.select(['id', 'email', 'name', 'address', 'phone_number'])
			)
			.offset((page - 1) * pageSize)
			.limit(pageSize);
	}
	async getOrdersByStore(
		storeId,
		status = -1,
		after = epoch,
		before = new Date(),
		page = 1,
		pageSize = Number.MAX_VALUE
	) {
		return OrderItem.query()
			.where('date', '>', after)
			.andWhere('date', '<', before)
			.andWhere('store_id', storeId)
			.modify(builder => filterStatus(builder, status))
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
	stringifyAttributes(order) {
		order.orderDetails.forEach(detail => {
			detail.attributes = JSON.stringify(detail.attributes);
		});
		return order;
	}
	async createOrder(order) {
		order = this.stringifyAttributes(order);
		const orderItem = await transaction(
			OrderItem.knex(),
			async trx => await OrderItem.query(trx).insertGraph(order)
		);
		return this.getOrderById(orderItem.id);
	}
	async updateOrder(id, order) {
		order.id = id;
		order = this.stringifyAttributes(order);
		const orderItem = await transaction(
			OrderItem.knex(),
			async trx => await OrderItem.query(trx).upsertGraphAndFetch(order)
		);
		return this.getOrderById(orderItem.id);
	}
	async patchOrder(id, patch) {
		return await OrderItem.query()
			.patch(patch)
			.where('id', id);
	}
}

module.exports = OrderItemService;
