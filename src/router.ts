import e, { Router } from 'express';
import { body, param } from 'express-validator';
import { createProduct, deleteProduct, getProductById, getProducts, updateAvialibility, updateProduct } from './handlers/products';
import { handleInputErrors } from './middleware';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The product name
 *                  example: "Laptop"
 *              price:
 *                  type: number
 *                  description: The product price
 *                  example: 1000
 *              availability:
 *                  type: boolean
 *                  description: The product availability
 *                  example: true
 */

//Routing
/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Get a list of products
 *      tags:
 *          - Products
 *      description: Returns a list of products
 *      responses:
 *          200:
 *              description: Successfull response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Returns a product by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successfull response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad request - Invalid ID supplied
 */
router.get('/:id', 
    // Validar los datos
    param('id').isInt().withMessage('El ID debe ser un numero entero'),
    handleInputErrors,
    getProductById
);


/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags:
 *          - Products
 *      description: Create a new product
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo"
 *                          price:
 *                              type: number
 *                              example: 500
 *      responses:
 *          201:
 *              description: Product created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid data supplied
 */
router.post('/', 
     // Validar los datos
     body('name')
        .notEmpty().withMessage('El nombre de Producto es requerido'),

    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio de Producto es requerido')
        .custom( value => value > 0 ).withMessage('El precio debe ser mayor a 0'),

    handleInputErrors,

    createProduct
);


/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product
 *      tags:
 *          - Products
 *      description: Update a product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to update
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo"
 *                          price:
 *                              type: number
 *                              example: 500
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Product updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid data supplied
 *          404:
 *              description: Product not found
 */
router.put('/:id', 
    // Validar los datos
    param('id').isInt().withMessage('El ID debe ser un numero entero'),
    body('name')
        .notEmpty().withMessage('El nombre de Producto es requerido'),

    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio de Producto es requerido')
        .custom( value => value > 0 ).withMessage('El precio debe ser mayor a 0'),

    body('availability')
        .isBoolean().withMessage('Valor no valido'),

    handleInputErrors,
    
    updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update availability of a product
 *      tags:
 *          - Products
 *      description: Update availability of a product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to update
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Product availability updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid data supplied
 *          404:
 *              description: Product not found
 */
router.patch('/:id', 
    param('id').isInt().withMessage('El ID debe ser un numero entero'),
    handleInputErrors,
    updateAvialibility
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a product
 *      tags:
 *          - Products
 *      description: Delete a product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Product deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: "Producto eliminado"
 *          400:
 *              description: Bad request - Invalid ID supplied
 *          404:
 *              description: Product not found
 */
router.delete('/:id', 
    param('id').isInt().withMessage('El ID debe ser un numero entero'),
    handleInputErrors,
    deleteProduct
);

export default router;