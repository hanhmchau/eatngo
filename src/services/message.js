const Member = require('../models/member');
const { raw } = require('objection');
const admin = require('firebase-admin');
const constants = require('../constants');

class MessageService {
	constructor({ memberService }) {
		this.memberService = memberService;
	}
	async message(token, data = 'mock') {
		admin.messaging().send({
			data: {
				data
			},
			token
		});
	}
	async announceNewOrder(storeId, orderId) {
		const recipients = await this.memberService.getEmployeesByStore(storeId);
		const tokens = recipients.map(r => r.deviceToken).filter(r => !!r);

		if (tokens.length) {
			admin.messaging().sendMulticast({
				data: {
					type: 'HAS_NEW_ORDER',
					orderId: orderId.toString()
				},
				tokens
			});
		}
	}
	_getStatusType(status) {
		switch (status) {
			case constants.ORDER_STATUS.REJECTED:
				return 'ORDER_REJECTED';
			case constants.ORDER_STATUS.COMPLETED:
				return 'ORDER_COMPLETED';
			default:
				return '';
		}
	}
	async announceOrderStatus(order) {
		const token = (await this.memberService.getMemberById(order.memberId))
			.deviceToken;

		if (token) {
			admin.messaging().send({
				data: {
					type: this._getStatusType(order.status),
					orderId: order.id.toString()
				},
				token
			});
		}
	}
}

module.exports = MessageService;
