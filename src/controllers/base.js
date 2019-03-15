const di = require('../di');
const container = di.container;

const BrandService = require('../services/brand');
const FoodService = require('../services/food');
const StoreService = require('../services/store');
const MemberService = require('../services/member');

class BaseController {
	// constructor(brandService, foodService, storeService, memberService) {
	// 	this.brandService = brandService;
	// 	this.foodService = foodService;
	// 	this.storeService = storeService;
	// 	this.memberService = memberService;
	// }
}

// container
// 	.register('controller', BaseController)
// 	.addArgument(new di.Reference('storeService'));

module.exports = BaseController;
