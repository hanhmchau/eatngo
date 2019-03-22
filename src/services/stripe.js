const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:

class StripeService {
	async charge(token, amount, recipient, description = 'Order') {
		const params = {
			amount,
			currency: 'usd',
			description,
			source: token
		};
		if (recipient) {
			params.destination = {
				amount,
				account: recipient
			};
		}
		return await stripe.charges.create(params);
	}
}

module.exports = StripeService;
