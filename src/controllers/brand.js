const ERROR = {
	NOT_FOUND: {
		error: 'No brand with this id was found'
	}
};

class BrandController {
	constructor({ brandService, storeService, memberService, orderItemService }) {
		this.brandService = brandService;
		this.storeService = storeService;
		this.memberService = memberService;
		this.orderItemService = orderItemService;
	}

	async getBrands(req, res) {
		const { enabledOnly, page, pageSize } = { ...req.query };
		res.json(await this.brandService.getAllBrands(enabledOnly, page, pageSize));
	}

	async getBrandById(req, res) {
		const id = req.params.id;
		const brand = await this.brandService.getBrandById(id);
		if (brand) {
			res.json(brand);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async createBrand(req, res) {
		const { name, description, creatorId, avatar } = { ...req.body };
		const result = await this.brandService.createBrand({
			name,
			description,
			creatorId,
			avatar,
			isDisabled: false,
			isDeleted: false
		});
		res.json(result);
	}

	async updateBrand(req, res) {
		const id = req.params.id;
		const { name, description, creatorId, avatar, isDisabled, isDeleted } = {
			...req.body
		};
		const result = await this.brandService.updateBrand(id, {
			name,
			description,
			creatorId,
			avatar,
			isDisabled,
			isDeleted
		});
		if (result) {
			res.sendStatus(204);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async deleteBrand(req, res) {
		const id = req.params.id;
		const result = await this.brandService.deleteBrand(id);
		if (result) {
			res.sendStatus(204);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async getOrdersByBrand(req, res) {
		const id = req.params.id;
		const result = await this.orderItemService.getOrdersByBrand(id);
		res.json(result);
	}

	async getStoresByBrand(req, res) {
		const id = req.params.id;
		const result = await this.storeService.getStoresByBrand(id);
		res.json(result);
	}

	async getManagersByBrand(req, res) {
		const brandId = req.params.id;
		const managers = await this.memberService.getManagersByBrand(brandId);
		res.json(managers);
	}
}

// router.get('/:id/stores', async (req, res) => {
// });

// router.get('/:id/managers', async (req, res) => {
// });
// router.get('/:id/promotion-campaigns', (req, res, next) => {});

// brand/1/store
// brand/1/food

module.exports = BrandController;
