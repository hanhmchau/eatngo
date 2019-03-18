const Member = require('../models/member');
const Brand = require('../models/brand');
const jwt = require('jsonwebtoken');
const util = require('util');
const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

class MemberService {
	async getManagersByBrand(brandId) {
		const brand = await Brand.query()
			.where('id', brandId)
			.select('id', 'email', 'name', 'address', 'gender', 'phone_number')
			.eager('managers')
			.orderBy('id')
			.first();
		return brand.managers;
	}
	async getMemberById(id) {
		return await Member.query()
			.skipUndefined()
			.where('id', id)
			.select('id', 'email', 'name', 'address', 'gender', 'phone_number')
			.eager('[storesEmployedIn, brandsManaged]')
			.modifyEager('storesEmployedIn', builder => {
				builder.where('is_deleted', false);
			})
			.modifyEager('brandsManaged', builder => {
				builder.where('is_deleted', false);
			})
			.first();
	}
	async signToken(id) {
		return await sign(
			{
				id
			},
			process.env.PRIVATE,
			{
				expiresIn: '30d'
			}
		);
	}
	async register(member) {
		const memberDetails = await Member.query()
			.insert(member)
			.returning('*');
		memberDetails.token = await this.signToken(memberDetails.id);
		return memberDetails;
	}
	async login(member) {
		const { facebookId, phoneNumber } = { ...member };
		const memberDetails = await Member.query()
			.where('phone_number', phoneNumber)
			.andWhere('facebook_id', facebookId)
			.first();
		if (memberDetails) {
			memberDetails.token = await this.signToken(memberDetails.id);
			return memberDetails;
		}
	}
	async updateMember(member) {
		return await Member.query().patchAndFetchById(member.id, member);
	}
}

module.exports = MemberService;
