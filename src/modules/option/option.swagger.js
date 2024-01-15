/**
 * @swagger
 * tags:
 *  name: Option
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateOption:
 *              type: object
 *              required:
 *                  -   title
 *                  -   key
 *                  -   type
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  category:
 *                      type: string
 *                  required:
 *                      type: boolean
 *                  guid:
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   boolean
 *                          -   array
 *                  enum:
 *                      type: array
 *                      items:
 *                          type: string
 *          UpdateOption:
 *              type: object
 *              properties:
 *
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  category:
 *                      type: string
 *                  required:
 *                      type: boolean
 *                  guid:
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   boolean
 *                          -   array
 *                  enum:
 *                      type: array
 *                      items:
 *                          type: string
 *
 */

/**
 * @swagger
 *
 * /option:
 *  post:
 *      summary: create new option for category
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *      responses:
 *          201:
 *              description: created
 */

/**
 * @swagger
 *
 * /option/{optionId}:
 *  put:
 *      summary: update option by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: optionId
 *              type: string
 *              required: true
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateOption'
 *      responses:
 *          201:
 *              description: updated successfully
 */

/**
 * @swagger
 *
 * /option/by-category-id/{categoryId}:
 *  get:
 *      summary: get options by category id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *              type: string
 *              required: true
 *
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /option/by-category-slug/{categorySlug}:
 *  get:
 *      summary: get options by category slug
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: categorySlug
 *              type: string
 *              required: true
 *
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /option/{id}:
 *  get:
 *      summary: get option by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /option/{id}:
 *  delete:
 *      summary: delete option by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /option:
 *  get:
 *      summary: get all options of category
 *      tags:
 *          -   Option
 *      responses:
 *          200:
 *              description: success
 */
