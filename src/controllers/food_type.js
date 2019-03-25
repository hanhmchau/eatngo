class FoodTypeController {
	constructor({ foodTypeService }) {
		this.foodTypeService = foodTypeService;
	}

	async getFoodTypes(req, res) {
		const types = await this.foodTypeService.getFoodTypes();
		res.json(types);
	}
}

module.exports = FoodTypeController;
