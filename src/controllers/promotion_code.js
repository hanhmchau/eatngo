// promotion-campaigns
// promotion-campaigns/:id

const ERROR = {
	NOT_FOUND: {
		error: 'No promotion code with this id was found'
	}
};

class PromotionCodeController {
	constructor({ promotionCodeService }) {
		this.promotionCodeService = promotionCodeService;
	}

	async getPromotionCodes(req, res) {
		res.json(await this.promotionCodeService.getPromotionCodes());
	}

	async getPromotionCodeById(req, res) {
		const id = req.params.id;
		const promotionCode = await this.promotionCodeService.getPromotionCodeById(
			id
		);
		if (promotionCode) {
			res.json(promotionCode);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async createPromotionCode(req, res) {
		const { code, percentageDiscount, brandId } = { ...req.body };
		const result = await this.promotionCodeService.createPromotionCode({
			code,
			percentageDiscount,
			brandId
		});
		res.json(result);
	}

	async updatePromotionCode(req, res) {
		const id = req.params.id;
		const { code, percentageDiscount, brandId } = { ...req.body };
		const result = await this.promotionCodeService.updatePromotionCode(id, {
			code,
			percentageDiscount,
			brandId
		});
		if (result) {
			res.json(result);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async deletePromotionCode(req, res) {
		const id = req.params.id;
		const result = await this.promotionCodeService.deletePromotionCode(id);
		if (result) {
			res.sendStatus(204);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

}

module.exports = PromotionCodeController;
