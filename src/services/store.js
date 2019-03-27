const Store = require('../models/store');
const BaseService = require('./base');

class StoreService extends BaseService {
	async getStores(
		page = 1,
		pageSize = 10,
		search = '',
		filterCuisine = 0,
		getOnlyOperating = true
	) {
		const stores = await Store.query()
			.skipUndefined()
			.where('is_deleted', false)
			.eager('brand.[promotionCodes]')
			.modify(queryBuilder => {
				if (getOnlyOperating) {
					queryBuilder.andWhere('is_operating', true);
				}
				if (search) {
					queryBuilder
						.where('name', 'like', `%${search}%`)
						.orWhere('brand.name', 'like', `%${search}%`);
				}
				if (filterCuisine) {
					queryBuilder.mergeEager('brand.[foods]');
				}
			})
			.modifyEager('brand', builder =>
				builder.modifyEager('promotionCodes', b =>
					b.where('promotion_code.is_deleted', false)
				)
			)
			.orderBy('id')
			.offset((page - 1) * pageSize)
			.limit(pageSize);
		if (filterCuisine) {
			const filteredStores = stores.filter(store => {
				if (store.brand) {
					const foods = store.brand.foods;
					const hasCuisine = foods.reduce(
						(prev, curr) => prev || curr.typeId === parseInt(filterCuisine),
						false
					);
					return hasCuisine;
				}
				return true;
			});
			filteredStores.forEach(store => {
				if (store.brand) {
					delete store.brand.foods;
				}
			});
			return filteredStores;
		} else {
			return stores;
		}
	}
	async getStoresByBrand(id, getOnlyOperating = true) {
		return await Store.query()
			.skipUndefined()
			.where('brand_id', id)
			.andWhere('is_deleted', false)
			.modify(queryBuilder => {
				if (getOnlyOperating) {
					queryBuilder.andWhere('is_operating', true);
				}
			})
			.orderBy('id');
	}
	async getStoreById(id, getOnlyOperating = true) {
		return await Store.query()
			.skipUndefined()
			.where('id', id)
			.modify(queryBuilder => {
				if (getOnlyOperating) {
					queryBuilder.andWhere('store.is_operating', true);
				}
			})
			.andWhere('store.is_deleted', false)
			.eager('[employees, brand.[promotionCodes]]')
			.modifyEager('brand', builder =>
				builder.modifyEager('promotionCodes', b => b.where('is_deleted', false))
			)
			.first();
	}
	async createStore(store) {
		return await Store.query()
			.insert(store)
			.returning('id');
	}
	async updateStore(id, store) {
		return await Store.query().patchAndFetchById(id, store);
	}
	async deleteStore(id) {
		return await Store.query()
			.patch({
				isDeleted: true
			})
			.where('id', id);
	}
}

module.exports = StoreService;
