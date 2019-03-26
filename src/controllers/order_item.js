// order-items <-- search by user
// GET order-items/:id
// POST order-items
// PUT order-items/:id

const ERROR = {
	NOT_FOUND: {
		error: 'No order with this id was found'
	}
};
const constants = require('../constants');

class OrderItemController {
	constructor({ orderItemService }) {
		this.orderItemService = orderItemService;
	}

	async getOrderItems(req, res) {
		const { status, after, before, page, pageSize } = { ...req.query };
		const foods = await this.orderItemService.getOrders(
			status,
			after,
			before,
			page,
			pageSize
		);
		res.json(foods);
	}

	async getOrderItemById(req, res) {
		const id = req.params.id;
		const result = await this.orderItemService.getOrderById(id);
		if (result) {
			res.json(result);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async createOrder(req, res) {
		const {
			token,
			storeId,
			memberId,
			promotionCode, // { id, code, percentageDiscount }
			comment,
			orderDetails // { foodId, orderItemId, price, quantity, attributes, comment }
		} = { ...req.body };
		// make payment here
		const result = await this.orderItemService.createOrder(
			{
				storeId,
				memberId,
				promotionCode,
				comment,
				status: constants.ORDER_STATUS.PAID,
				date: new Date(),
				orderDetails
			},
			token
		);
		if (!result.error) {
			res.json(result);
		} else {
			res.status(500).json(result);
		}
	}

	async updateOrder(req, res) {
		const id = req.params.id;
		const {
			storeId,
			memberId,
			promotionCode, // { id, code, percentageDiscount }
			status,
			comment,
			orderDetails
		} = { ...req.body };
		const result = await this.orderItemService.updateOrder(id, {
			storeId,
			memberId,
			promotionCode,
			status,
			comment,
			orderDetails
		});
		if (result) {
			res.json(result);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async patchOrder(req, res) {
		const id = req.params.id;
		const { storeId, memberId, promotionCodeId, status, comment } = {
			...req.body
		};
		const result = await this.orderItemService.patchOrder(id, {
			storeId,
			memberId,
			promotionCodeId,
			status,
			comment
		});
		if (result) {
			res.json({
				status
			});
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}
	async createReview(req, res) {
		const orderId = req.params.id;
		const { staffAttitude, speed, quality, cleanliness } = {
			...req.body
		};
		const result = await this.orderItemService.createReview(orderId, {
			staffAttitude,
			speed,
			quality,
			cleanliness,
			hasReview: true
		});
		res.json(result);
	}
	async updateReview(req, res) {
		const orderId = req.params.id;
		const { staffAttitude, speed, quality, cleanliness } = {
			...req.body
		};
		const result = await this.orderItemService.updateReview(orderId, {
			staffAttitude,
			speed,
			quality,
			cleanliness,
			hasReview: true
		});
		res.json(result);
	}
	async deleteReview(req, res) {
		const orderId = req.params.id;
		const result = await this.orderItemService.deleteReview(orderId);
		res.json(result);
	}
}

module.exports = OrderItemController;
