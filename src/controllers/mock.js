class MockController {
	constructor({ messageService }) {
		this.messageService = messageService;
	}
	async message(req, res) {
		const { token, data } = { ...req.query };
		await this.messageService.message(token, data);
		res.sendStatus(204);
	}
}
module.exports = MockController;
