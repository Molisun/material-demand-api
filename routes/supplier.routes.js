// routes/supplier.routes.js
const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');

/**
 * @swagger
 * tags:
 *   - name: Supplier
 *     description: API endpoints for managing suppliers
 */

/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Create a new supplier record
 *     tags: [Supplier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierCode:
 *                 type: string
 *                 description: Unique code for the supplier
 *               supplierName:
 *                 type: string
 *                 description: Name of the supplier
 *     responses:
 *       '201':
 *         description: Supplier created successfully
 *       '400':
 *         description: Missing required fields
 *       '409':
 *         description: Supplier with given code already exists
 *       '500':
 *         description: Failed to create supplier
 */
router.post('/suppliers', supplierController.create);

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Get all supplier records
 *     tags: [Supplier]
 *     responses:
 *       '200':
 *         description: A JSON array of all supplier records
 *       '500':
 *         description: Failed to fetch suppliers
 */
router.get('/suppliers', supplierController.getAll);

/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Get a supplier record by ID
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the supplier record
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The requested supplier record
 *       '404':
 *         description: supplier with specified ID not found
 *       '500':
 *         description: Failed to fetch supplier
 */
router.get('/suppliers/:id', supplierController.getById);

/**
 * @swagger
 * /suppliers/{supplierCode}:
 *   get:
 *     summary: Get a supplier record by supplierCode
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: supplierCode
 *         required: true
 *         description: Unique code for the supplier
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested supplier record
 *       '404':
 *         description: supplier with specified ID not found
 *       '500':
 *         description: Failed to fetch supplier
 */
router.get('/suppliers/code/:supplierCode', supplierController.getByCode);

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Update an existing supplier record
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the supplier record
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierCode:
 *                 type: string
 *                 description: Unique code for the supplier
 *               supplierName:
 *                 type: string
 *                 description: Name of the supplier
 *     responses:
 *       '200':
 *         description: supplier updated successfully
 *       '400':
 *         description: Missing required fields
 *       '404':
 *         description: supplier with specified ID not found
 *       '500':
 *         description: Failed to update supplier
 */
router.put('/suppliers/:id', supplierController.update);

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Delete a supplier record by ID
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the supplier record
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: supplier deleted successfully
 *       '404':
 *         description: supplier with specified ID not found
 *       '500':
 *         description: Failed to delete supplier
 */
router.delete('/suppliers/:id', supplierController.delete);

module.exports = router;