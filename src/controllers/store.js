const ERROR = {
	NOT_FOUND: {
		error: 'No store with this id was found'
	}
};

class StoreController {
	constructor({ storeService, orderItemService }) {
		this.storeService = storeService;
		this.orderItemService = orderItemService;
	}

	async getStores(req, res) {
		const stores = await this.storeService.getStores();
		res.json(stores);
	}

	async getStoreById(req, res) {
		const id = req.params.id;
		const store = await this.storeService.getStoreById(id);
		if (store) {
			res.json(store);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async createStore(req, res) {
		const { name, address, brandId, phone, openingHour, closingHour } = {
			...req.body
		};
		const result = await this.storeService.createStore({
			name,
			address,
			brandId,
			phone,
			openingHour,
			closingHour
		});
		res.json(result);
	}

	async updateStore(req, res) {
		const id = req.params.id;
		const { name, address, brandId, phone, openingHour, closingHour } = {
			...req.body
		};
		const result = await this.storeService.updateStore(id, {
			name,
			address,
			brandId,
			phone,
			openingHour,
			closingHour
		});
		if (result) {
			res.sendStatus(204);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async deleteStore(req, res) {
		const id = req.params.id;
		const result = await this.storeService.deleteStore(id);
		if (result) {
			res.sendStatus(204);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async getOrderItemsByStore(req, res) {
		const storeId = req.params.id;
		const results = this.orderItemService.getOrdersByStore(storeId);
		res.json(results);
	}
}

module.exports = StoreController;
