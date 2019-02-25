
/**
 * @apiDefine InternalServerError
 *
 * @apiError (5xx) InternalServerError Something happened beyond expectation.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @apiDefine NotFoundError
 *
 * @apiError (404) NotFound An entity with this id was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Not Found"
 *     }
 */

/**
 * @apiDefine BadRequestError
 *
 * @apiError (400) BadRequest The format of this request is invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Bad Request"
 *     }
 */

/**
* @apiDefine BrandExample
* @apiParamExample  Success-Response:
*     {
*       "name": "The Coffee House",
*       "description": "The Coffee House is a singer-songwriter and acoustic rock radio station on Sirius XM Radio, channel 14. It can also be heard on Dish Network channel 6014.",
*       "avatar": "https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg",
*       "creator": 1
*     }
*/
