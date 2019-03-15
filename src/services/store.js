const Store = require('../models/store');
const BaseService = require('./base');

class StoreService extends BaseService {
	async getStores(getOnlyOperating = true) {
		return await Store.query()
			.skipUndefined()
			.where('is_deleted', false)
			.modify(queryBuilder => {
				if (getOnlyOperating) {
					queryBuilder.andWhere('is_operating', true);
				}
			})
			// .eager('brand')
			.orderBy('id');
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
			.eager('employees')
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
