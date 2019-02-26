const Store = require('../models/store');

class BrandService {
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
					queryBuilder.andWhere('is_operating', true);
				}
			})
			.andWhere('is_deleted', false)
			.eager('stores')
			.modifyEager('stores', builder => {
				builder.where('is_operating', true);
			})
			.orderBy('id');
	}
}

module.exports = BrandService;
