const Brand = require('../models/brand');
const Food = require('../models/food');

class FoodService {
	groupByType(foods) {
		const types = {};
		foods.forEach(food => {
			const type = food.type;
			if (!types[type.name]) {
				types[type.name] = [];
			}
			types[type.name].push(food);
		});
		return types;
	}
	async getFoods(page = 1, pageSize = 10, groupByType = true) {
		const foods = await Food.query()
			.where('food.is_deleted', false)
			.andWhere('food.is_disabled', false)
			.eager('[brand, images, type]')
			.modifyEager('images', builder => {
				builder.select('image');
			})
			.joinRelation('brand')
			.andWhere('brand.is_deleted', false)
			.andWhere('brand.is_disabled', false)
			.offset((page - 1) * pageSize)
			.limit(pageSize);
		if (groupByType) {
			return this.groupByType(foods);
		} else {
			return foods;
		}
	}
	async getFoodsByBrand(id, getEnabledOnly = false, page = 1, pageSize = 10, groupByType = true) {
		const brand = await Brand.query()
			.where('id', id)
			.andWhere('is_deleted', false)
			.eager('foods.[images, type]')
			.modifyEager('images', builder => {
				builder.select('image');
			})
			.modifyEager(builder => {
				builder.where('is_deleted', false);
				if (getEnabledOnly) {
					builder.where('is_disabled', false);
				}
				builder
					.eager('images')
					.offset((page - 1) * pageSize)
					.limit(pageSize);
			})
			.first();
		const foods = brand.foods;
		if (groupByType) {
			return this.groupByType(foods);
		} else {
			return foods;
		}
	}
	async getFoodById(id, getEnabledOnly = false) {
		return await Food.query()
			.where('id', id)
			.where('is_deleted', false)
			.modify(builder => {
				if (getEnabledOnly) {
					builder.andWhere('is_disabled', false);
				}
			})
			.eager('[extras, images, type]')
			.modifyEager('images', builder => {
				builder.select('image');
			})
			.first();
	}
	async createFood(food) {
		return await Food.query()
			.insert(food)
			.returning('id');
	}
	async updateFood(id, food) {
		return await Food.query().patchAndFetchById(id, food);
	}
	async deleteFood(id) {
		return await Food.query()
			.patch({
				isDeleted: true
			})
			.where('id', id);
	}
}

module.exports = FoodService;
