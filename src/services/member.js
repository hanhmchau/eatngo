const Member = require('../models/member');
const Brand = require('../models/brand');
const Store = require('../models/store');
const jwt = require('jsonwebtoken');
const util = require('util');
const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);
const { raw, transaction } = require('objection');

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
			.modify(builder => {
				if (facebookId) {
					builder.andWhere('facebook_id', facebookId);
				}
			})
			// .andWhere('facebook_id', facebookId)
			.eager('storesEmployedIn')
			.first();

		const knex = Member.knex();
		const result = await knex.raw(
			'SELECT store_id, COUNT(*) FROM order_item WHERE status = 0 GROUP BY store_id'
		);
		memberDetails.storesEmployedIn.forEach(store => {
			const res = result.rows.filter(r => {
				return r.store_id === store.id;
			})[0];
			store.activeOrderCount = res ? parseInt(res.count) : 0;
		});
		if (memberDetails) {
			memberDetails.token = await this.signToken(memberDetails.id);
			return memberDetails;
		}
	}
	async updateMember(id, member) {
		return await Member.query().patchAndFetchById(id, member);
	}
}

module.exports = MemberService;
