const express = require('express');
const router = express.Router();

/**
 * @api {get} /stores/ Request list of brands
 * @apiName /store/
 * @apiGroup Store
 *
 * @apiParam {String} search Only returns brands with this keyword in name or description. Omit to return all results.
 * @apiParam {Number} limit The number of returned results. Omit to return all results.
 * @apiParam {Number} offset Only returns results after this offset. Omit to return from the top.
 * @apiParam {String} sort Can be one of 'name', 'creator', 'closest', 'discount'.
 *
 * @apiSuccess {Object[]} brands Result brands.
 * @apiSuccess {Number} id Id of the brand.
 * @apiSuccess {String} name Name of the brand.
 * @apiSuccess {String} description Description of the brand.
 * @apiSuccess {String} avatar Avatar of the brand.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": 1,
 *       "name": "The Coffee House",
 *       "description": "The Coffee House is a singer-songwriter and acoustic rock radio station on Sirius XM Radio, channel 14. It can also be heard on Dish Network channel 6014.",
 *       "avatar": "https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg",
 *     }, {
 *       "id": 2,
 *       "name": "Starbuck",
 *       "description": "Starbucks uses the highest quality arabica coffee as the base for its espresso drinks. Learn about our unique coffees and espresso drinks today.",
 *       "avatar": "https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg",
 *     }]
 *
 * @apiUse InternalServerError
 */
router.get('/', (req, res, next) => {
	res.statusCode(200);
});

/**
 * @api {get} /brand/:id Request brand by Id
 * @apiName /brand/:id
 * @apiGroup Brand
 *
 * @apiSuccess {Number} id Id of the brand.
 * @apiSuccess {String} name Name of the brand.
 * @apiSuccess {String} description Description of the brand.
 * @apiSuccess {String} avatar Avatar of the brand.
 * @apiSuccess {Object} creator Creator of the brand.
 * @apiSuccess {Number} creator.id
 * @apiSuccess {String} creator.name
 * @apiSuccess {String} creator.email
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "The Coffee House",
 *       "description": "The Coffee House is a singer-songwriter and acoustic rock radio station on Sirius XM Radio, channel 14. It can also be heard on Dish Network channel 6014.",
 *       "avatar": "https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg",
 *       "creator": {
 *          "id": 1
 *          "name": "Little Red",
 *          "email": "little.red@gmail.com"
 *       }
 *     }
 *
 * @apiUse NotFoundError
 * @apiUse InternalServerError
 */
router.get('/:id', (req, res, next) => {
	res.statusCode(200);
});

router.post('/:id', (req, res, next) => {
	res.statusCode(200);
});

router.put('/:id', (req, res, next) => {
	res.statusCode(200);
});

router.delete('/:id', (req, res, next) => {
	res.statusCode(200);
});

router.get('/:id/store', (req, res, next) => {
	res.statusCode(200);
});

router.get('/:id/food', (req, res, next) => {
	res.statusCode(200);
});

// stores
// stores/1
// stores/1/order-items

module.exports = router;
