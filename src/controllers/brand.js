const express = require('express');
const router = express.Router();
const BrandService = require('../services/brand');
const brandService = new BrandService();

/**
 * @api {get} /brands/ Request list of brands
 * @apiName /brand/
 * @apiGroup Brand
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
router.get('/', async (req, res) => {
	res.json(await brandService.getAllBrands());
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
router.get('/:id', async (req, res) => {
	const id = req.body.id;
	const brand = await brandService.getBrandById(id);
	res.json(brand);
});

/**
 * @api {post} /brand/ Create a new brand
 * @apiName /brand/
 * @apiGroup Brand
 *
 * @apiParam  {String} name Name of the brand.
 * @apiParam  {String} description Description of the brand.
 * @apiParam  {String} avatar Avatar of the brand.
 * @apiParam  {Object} creator Creator of the brand.
 * @apiParam  {Number} creator.id
 *
 * @apiUse BrandExample
 * @apiSuccess {Number} id Id of the brand.
 * @apiSuccessExample  Success-Response:
 *     {
 *       "id": 1
 *     }
 * @apiUse BadRequestError
 * @apiUse NotFoundError
 * @apiUse InternalServerError
 */
router.post('/', (req, res, next) => {
	res.statusCode(200);
});

router.put('/:id', (req, res, next) => {
	res.statusCode(200);
});

router.delete('/:id', (req, res, next) => {
	res.statusCode(200);
});

/**
 * @api {get} /:id/stores Get stores of a brand by Id
 * @apiName /brand/
 * @apiGroup Brand
 *
 * @apiSuccess  {Object[]} store Store belonging to this brand.
 * @apiSuccess  {store.id} id Id of the store.
 * @apiSuccess  {store.name} name Name of the store.
 * @apiSuccess  {store.address} address Address of the store.
 * @apiSuccess  {store.phone} phone The contact phone number of the store.
 * @apiSuccess  {store.opening_hour} opening_hour The opening hour of the store.
 * @apiSuccess  {store.closing_hour} closing_hour The closing hour of the store.
 * @apiSuccess  {store.is_operating} is_operating Whether the store is currently operating.
 *
 * @apiUse BrandExample
 * @apiSuccess {Number} id Id of the brand.
 * @apiSuccessExample  Success-Response:
 *     {
 *       "id": 1
 *     }
 * @apiUse BadRequestError
 * @apiUse NotFoundError
 * @apiUse InternalServerError
 */
router.get('/:id/stores', (req, res, next) => {
	res.statusCode(200);
});

/**
 * @api {post} /brand/ Create a new brand
 * @apiName /brand/
 * @apiGroup Brand
 *
 * @apiParam  {String} name Name of the brand.
 * @apiParam  {String} description Description of the brand.
 * @apiParam  {String} avatar Avatar of the brand.
 * @apiParam  {Object} creator Creator of the brand.
 * @apiParam  {Number} creator.id
 *
 * @apiUse BrandExample
 * @apiSuccess {Number} id Id of the brand.
 * @apiSuccessExample  Success-Response:
 *     {
 *       "id": 1
 *     }
 * @apiUse BadRequestError
 * @apiUse NotFoundError
 * @apiUse InternalServerError
 */
router.get('/:id/foods', (req, res, next) => {
	res.statusCode(200);
});

/**
 * @api {post} /brand/ Create a new brand
 * @apiName /brand/
 * @apiGroup Brand
 *
 * @apiParam  {String} name Name of the brand.
 * @apiParam  {String} description Description of the brand.
 * @apiParam  {String} avatar Avatar of the brand.
 * @apiParam  {Object} creator Creator of the brand.
 * @apiParam  {Number} creator.id
 *
 * @apiUse BrandExample
 * @apiSuccess {Number} id Id of the brand.
 * @apiSuccessExample  Success-Response:
 *     {
 *       "id": 1
 *     }
 * @apiUse BadRequestError
 * @apiUse NotFoundError
 * @apiUse InternalServerError
 */
router.get('/:id/promotion-campaigns', (req, res, next) => {
	res.statusCode(200);
});

// brand/1/store
// brand/1/food

module.exports = router;
