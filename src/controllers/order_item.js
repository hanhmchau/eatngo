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
			attitude,
			speed,
			service,
			recommended,
			comment,
			orderDetails // { foodId, orderItemId, price, quantity, attributes, comment }
		} = { ...req.body };
		// make payment here
		const result = await this.orderItemService.createOrder(
			{
				storeId,
				memberId,
				promotionCode,
				attitude,
				speed,
				service,
				recommended,
				comment,
				status: constants.ORDER_STATUS.PAID,
				date: new Date(),
				orderDetails
			},
			token
		);
		res.json(result);
	}

	async updateOrder(req, res) {
		const id = req.params.id;
		const {
			storeId,
			memberId,
			promotionCode, // { id, code, percentageDiscount }
			attitude,
			speed,
			service,
			recommended,
			status,
			comment,
			orderDetails
		} = { ...req.body };
		const result = await this.orderItemService.updateOrder(id, {
			storeId,
			memberId,
			promotionCode,
			attitude,
			speed,
			service,
			recommended,
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
		const {
			storeId,
			memberId,
			promotionCodeId,
			attitude,
			speed,
			service,
			recommended,
			status,
			comment
		} = { ...req.body };
		const result = await this.orderItemService.patchOrder(id, {
			storeId,
			memberId,
			promotionCodeId,
			attitude,
			speed,
			service,
			recommended,
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
}

module.exports = OrderItemController;
