const Brand = require('../models/brand');

class BrandService {
	async getAllBrands(getOnlyEnabledStore = true) {
		return await Brand.query()
			.skipUndefined()
			.where('is_deleted', false)
			.orderBy('id')
			.modify(queryBuilder => {
				if (getOnlyEnabledStore) {
					queryBuilder.andWhere('is_disabled', getOnlyEnabledStore);
				}
			});
	}
	async getBrandById(id, getOnlyEnabledStore = true) {
		return await Brand.query()
			.skipUndefined()
			.where('id', id)
			.where('is_deleted', false)
			.eager('stores')
			.modify(queryBuilder => {
				if (getOnlyEnabledStore) {
					queryBuilder.andWhere('is_disabled', getOnlyEnabledStore);
				}
			})
			.modifyEager('stores', builder => {
				builder.where('is_operating', true);
			})
			.orderBy('id');
	}
}

module.exports = BrandService;
