const FoodType = require('../models/food_type');
const BaseService = require('./base');

class FoodTypeService extends BaseService {
	async getFoodTypes() {
		return await FoodType.query()
			.skipUndefined()
			.orderBy('name');
	}
}

module.exports = FoodTypeService;
