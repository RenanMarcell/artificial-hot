const { Router } = require("express");
const { AuthorsController, PostsController } = require('./controller');

const routes = Router();

const authorsController = new AuthorsController();
const postsController = new PostsController();

/**
 * @swagger
 * /posts/:
 *  get:
 *    description: Filter posts by initial date, final date and order by (ups or comments)
 *    parameters:
 *      - in: body
 *        description: Request body
 *        name: Request body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            initial_date:
 *              description: Initial date for post creation
 *              type: date
 *              example: 01/01/2021
 *            final_date:
 *              description: Final date for post creation
 *              type: date
 *              example: 01/20/2021
 *            order_by:
 *              type: string
 *              description: ordered by most comments or upvotes
 *              enum: ['ups', 'comments']
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Missing or invalid data
 *      '500':
 *        description: Internal server error
 */
routes.get('/posts/', postsController.handle);

/**
 * @swagger
 * /authors/:
 *  get:
 *    description: Filter posts authors, ordered by most upvotes or comments
 *    parameters:
 *      - in: body
 *        description: Request body
 *        name: Request body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            order_by:
 *              type: string
 *              description: ordered by most comments or upvotes
 *              enum: ['ups', 'comments']
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Missing or invalid data
 *      '500':
 *        description: Internal server error
 */
routes.get('/authors/', authorsController.handle);

module.exports = routes;
