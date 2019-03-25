const PromotionCode = require('../models/promotion_code');

class PromotionCodeService {
	async getPromotionCodes() {
		return await PromotionCode.query()
			.where('is_deleted', false);
	}
	async getPromotionCodeById(id) {
		return await PromotionCode.query()
			.where('is_deleted', false)
			.andWhere('id', id)
			.first();
	}
	async createPromotionCode(promotionCode) {
		return await PromotionCode.query()
			.insert(promotionCode)
			.returning('*');
	}
	async updatePromotionCode(id, promotionCode) {
		return await PromotionCode.query().patchAndFetchById(id, promotionCode);
	}
	async deletePromotionCode(id) {
		return await PromotionCode.query()
			.patch({
				isDeleted: true
			})
			.where('id', id);
	}
}

module.exports = PromotionCodeService;
