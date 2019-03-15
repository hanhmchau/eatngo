// order-items <-- search by user
// GET order-items/:id
// POST order-items
// PUT order-items/:id

const ERROR = {
	NOT_FOUND: {
		error: 'No order with this id was found'
	}
};

class OrderItemController {
	constructor({ orderItemService }) {
		this.orderItemService = orderItemService;
	}

	async getOrderItems(req, res) {
		const { isCancelled, after, before, page, pageSize } = { ...req.query };
		const foods = await this.orderItemService.getOrders(isCancelled, after, before, page, pageSize);
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
			storeId,
			memberId,
			promotionCodeId,
			attitude,
			speed,
			service,
			recommended,
			orderDetails // { foodId, orderItemId, price, quantity, attributes}
		} = { ...req.body };
		const result = await this.orderItemService.createOrder({
			storeId,
			memberId,
			promotionCodeId,
			attitude,
			speed,
			service,
			recommended,
			isCancelled: false,
			date: new Date(),
			orderDetails
		});
		res.json(result);
	}

	async updateOrder(req, res) {
		const id = req.params.id;
		const {
			storeId,
			memberId,
			promotionCodeId,
			attitude,
			speed,
			service,
			recommended,
			isCancelled,
			orderDetails
		} = { ...req.body };
		const result = await this.orderItemService.updateOrder(id, {
			storeId,
			memberId,
			promotionCodeId,
			attitude,
			speed,
			service,
			recommended,
			isCancelled,
			orderDetails
		});
		if (result) {
			res.json(result);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}
}

module.exports = OrderItemController;
