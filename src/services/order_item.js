const OrderItem = require('../models/order_item');
const { transaction } = require('objection');
const epoch = new Date(0);

const filterStatus = (builder, status) => {
	if (status !== -1) {
		builder.andWhere('status', status);
	}
};

class OrderItemService {
	constructor({ stripeService, storeService }) {
		this.stripeService = stripeService;
		this.storeService = storeService;
	}
	async getOrders(
		status = -1,
		after = epoch,
		before = new Date(),
		page = 1,
		pageSize = Number.MAX_SAFE_INTEGER
	) {
		return OrderItem.query()
			.where('date', '>', after)
			.andWhere('date', '<', before)
			.modify(builder => filterStatus(builder, status))
			.eager(
				'[orderDetails.[food.[images]], store.[brand], member, promotionCode]'
			)
			.modifyEager('member', builder =>
				builder.select(['id', 'email', 'name', 'address', 'phone_number'])
			)
			.offset((page - 1) * pageSize)
			.limit(pageSize);
	}
	async getOrdersByMember(
		memberId,
		status = -1,
		after = epoch,
		before = new Date(),
		page = 1,
		pageSize = Number.MAX_SAFE_INTEGER
	) {
		return OrderItem.query()
			.where('date', '>', after)
			.andWhere('date', '<', before)
			.andWhere('member_id', memberId)
			.modify(builder => filterStatus(builder, status))
			.eager('[orderDetails.[food.[images]], store.[brand], promotionCode]')
			.modifyEager('member', builder =>
				builder.select(['id', 'email', 'name', 'address', 'phone_number'])
			)
			.offset((page - 1) * pageSize)
			.limit(pageSize);
	}
	async getOrdersByBrand(
		brandId,
		status = -1,
		after = epoch,
		before = new Date(),
		page = 1,
		pageSize = Number.MAX_SAFE_INTEGER
	) {
		const orderItems = await OrderItem.query()
			.where('date', '>', after)
			.andWhere('date', '<', before)
			.joinRelation('store')
			.andWhere('brand_id', brandId)
			.modify(builder => filterStatus(builder, status))
			.eager('[orderDetails.[food.[images]], store, member, promotionCode]')
			.modifyEager('member', builder =>
				builder.select(['id', 'email', 'name', 'address', 'phone_number'])
			)
			.offset((page - 1) * pageSize)
			.limit(pageSize);
		return orderItems;
	}
	async getOrdersByStore(
		storeId,
		status = -1,
		after = epoch,
		before = new Date(),
		page = 1,
		pageSize = Number.MAX_SAFE_INTEGER
	) {
		return OrderItem.query()
			.where('date', '>', after)
			.andWhere('date', '<', before)
			.andWhere('store_id', storeId)
			.modify(builder => filterStatus(builder, status))
			.eager('[orderDetails.[food.[images]], member, promotionCode]')
			.modifyEager('member', builder =>
				builder.select(['id', 'email', 'name', 'address', 'phone_number'])
			)
			.offset((page - 1) * pageSize)
			.limit(pageSize);
	}
	async getOrderById(id) {
		return await OrderItem.query()
			.where('id', id)
			.eager(
				'[orderDetails.[food.[images]], store.[brand], member, promotionCode]'
			)
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
	_getTotal(order) {
		let total = 0;
		const promotionCode = order.promotionCode;
		order.orderDetails.forEach(od => {
			total += od.quantity * od.price;
			const attributes = od.attributes || [];
			attributes.forEach(attr => {
				attr.options.forEach(opt => (total += opt.price));
			});
		});
		return (total * (100 - promotionCode)) / 100;
	}
	async createOrder(order, token) {
		const total = this._getTotal(order);
		try {
			let charge;
			if (token) {
				const stripeRecipient = (await this.storeService.getStoreById(
					order.storeId
				)).brand.stripeId;
				charge = await this.stripeService.charge(token, total, stripeRecipient);
			}
			if (order.promotionCode) {
				const promotion = order.promotionCode;
				delete order.promotionCode;
				order.promotionCodeId = promotion.id;
			}
			if (!token || (token && charge && charge.status === 'succeeded')) {
				order = this.stringifyAttributes(order);
				const orderItem = await transaction(
					OrderItem.knex(),
					async trx => await OrderItem.query(trx).insertGraph(order)
				);
				return this.getOrderById(orderItem.id);
			} else {
				return charge.status;
			}
		} catch (e) {
			return { error: e.message };
		}
	}
	async updateOrder(id, order) {
		order.id = id;
		order = this.stringifyAttributes(order);

		if (order.promotionCode) {
			const promotion = order.promotionCode;
			delete order.promotionCode;
			order.promotionCodeId = promotion.id;
		}

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
	async createReview(orderId, review) {
		return await OrderItem.query()
			.patchAndFetchById(orderId, review)
			.eager(
				'[orderDetails.[food.[images]], store.[brand], member, promotionCode]'
			);
	}
	async updateReview(orderId, review) {
		return await OrderItem.query()
			.patchAndFetchById(orderId, review)
			.eager(
				'[orderDetails.[food.[images]], store.[brand], member, promotionCode]'
			);
	}
	async deleteReview(orderId) {
		return await OrderItem.query()
			.patchAndFetchById(orderId, {
				staffAttitude: null,
				speed: null,
				quality: null,
				cleanliness: null,
				hasReview: false
			})
			.eager(
				'[orderDetails.[food.[images]], store.[brand], member, promotionCode]'
			);
	}
}

module.exports = OrderItemService;
