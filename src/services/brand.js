const Brand = require('../models/brand');

class BrandService {
	async getAllBrands(getOnlyEnabledStore = false, page = 1, pageSize = Number.MAX_SAFE_INTEGER) {
		return await Brand.query()
			.skipUndefined()
			.where('is_deleted', false)
			.orderBy('id')
			.offset((page - 1) * pageSize)
			.limit(pageSize)
			.modify(queryBuilder => {
				if (getOnlyEnabledStore) {
					queryBuilder.andWhere('is_disabled', getOnlyEnabledStore);
				}
			});
	}
	async getBrandById(id, getOnlyEnabledStore = false) {
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
			.first();
	}
	async createBrand(brand) {
		return await Brand.query()
			.insert(brand)
			.returning('id');
	}
	async updateBrand(id, brand) {
		return await Brand.query().patchAndFetchById(id, brand);
	}
	async deleteBrand(id) {
		return await Brand.query()
			.patch({
				isDeleted: true
			})
			.where('id', id);
	}
}

module.exports = BrandService;
