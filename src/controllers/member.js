// members
// members/:id
// members/:id/orders
// PUT members/:id
// POST members
// POST /authorize

const ERROR = {
	NOT_FOUND: {
		error: 'No member with this id was found'
	}
};

class MemberController {
	constructor({ memberService, orderItemService, brandService }) {
		this.memberService = memberService;
		this.orderItemService = orderItemService;
		this.brandService = brandService;
	}

	async getMemberById(req, res) {
		const id = req.params.id;
		const result = await this.memberService.getMemberById(id);
		if (result) {
			res.json(result);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async register(req, res) {
		const { email, name, phoneNumber, facebookId } = { ...req.body };
		const result = await this.memberService.register({
			email,
			phoneNumber,
			name,
			facebookId
		});
		res.json(result);
	}

	async login(req, res) {
		const { phoneNumber, facebookId } = { ...req.body };
		const result = await this.memberService.login({
			phoneNumber,
			facebookId
		});
		if (result) {
			res.json(result);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async updateMember(req, res) {
		const id = req.params.id;
		const { email, phoneNumber, address, card, name, avatar } = {
			...req.body
		};
		const result = await this.memberService.updateMember(id, {
			name,
			email,
			phoneNumber,
			address,
			card,
			avatar
		});
		if (result) {
			res.json(result);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async getOrdersByMember(req, res) {
		const id = req.params.id;
		const result = await this.orderItemService.getOrdersByMember(id);
		if (result) {
			res.json(result);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}

	async getBrandsByMember(req, res) {
		const id = req.params.id;
		const result = await this.brandService.getBrandsByMember(id);
		if (result) {
			res.json(result);
		} else {
			res.status(404).json(ERROR.NOT_FOUND);
		}
	}
}

module.exports = MemberController;
