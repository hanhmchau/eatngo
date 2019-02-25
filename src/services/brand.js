const Brand = require('../models/brand');

class BrandService {
	async getAllBrands(isDisabled) {
		return await Brand.query()
			.skipUndefined()
			.where('is_disabled', isDisabled)
			.andWhere('is_deleted', false)
			.orderBy('id');
	}
	async getBrandById(id, isDisabled) {
		return await Brand.query()
			.skipUndefined()
			.where('id', id)
			.where('is_disabled', isDisabled)
			.andWhere('is_deleted', false)
			.eager('stores')
			.modifyEager('stores', builder => {
				builder.where('is_operating', true);
			})
			.orderBy('id');
	}
}

module.exports = BrandService;
