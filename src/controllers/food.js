// foods
// foods/1
// foods/1/extras
// foods/1/images

const ERROR = {
	NOT_FOUND: {
		error: 'No food with this id was found'
	}
};

class FoodController {
	constructor({ foodService, storeService, brandService }) {
		this.brandService = brandService;
		this.storeService = storeService;
		this.foodService = foodService;
	}

	async getFoods(req, res) {
		const foods = await this.foodService.getFoods();
		res.json(foods);	
	}

	async getFoodById(req, res) {
		const id = req.params.id;
		const result = await this.foodService.getFoodById(id);
		if (result) {
			res.json(result);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}	
	}

	async createFood(req, res) {
		const {
			name,
			price,
			description,
			ingredient,
			isExtraOnly,
			sour,
			spicy,
			typeId,
			attributes,
			brandId
		} = { ...req.body };
		const result = await this.foodService.createFood({
			name,
			price,
			description,
			ingredient,
			isExtraOnly,
			sour,
			spicy,
			typeId,
			isDeleted: false,
			isDisabled: false,
			attributes: JSON.stringify(attributes),
			brandId
		});
		res.json(result);
	}

	async updateFood(req, res) {
		const id = req.params.id;
		const {
			name,
			price,
			description,
			ingredient,
			isExtraOnly,
			sour,
			spicy,
			typeId,
			attributes,
			brandId,
			isDeleted,
			isDisabled
		} = { ...req.body };
		const result = await this.foodService.updateFood(id, {
			name,
			price,
			description,
			ingredient,
			isExtraOnly,
			sour,
			spicy,
			typeId,
			attributes: JSON.stringify(attributes),
			brandId,
			isDeleted,
			isDisabled
		});
		if (result) {
			res.json(result);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}	
	}

	async deleteFood(req, res) {
		const id = req.params.id;
		const result = await this.foodService.deleteFood(id);
		if (result) {
			res.json(result);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}	
	}
	async addFoodImage(req, res) {
		const id = req.params.id;
		const { image } = { ...req.body };
		await this.foodService.addFoodImage(id, image);
		res.sendStatus(204);
	}
	async deleteFoodImage(req, res) {
		const id = req.params.id;
		const { image } = { ...req.body };
		await this.foodService.deleteFoodImage(id, image);
		res.sendStatus(204);
	}
}

module.exports = FoodController;
