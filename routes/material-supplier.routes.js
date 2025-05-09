// routes/material-supplier.routes.js
const express = require('express');
const router = express.Router();
const materialSupplierController = require('../controllers/material-supplier.controller');

/**
 * @swagger
 * tags:
 *   - name: MaterialSupplier
 *     description: API endpoints for managing material suppliers
 */

/**
 * @swagger
 * /material-supplier:
 *   post:
 *     summary: Create a new material supplier record
 *     tags: [MaterialSupplier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               material:
 *                 type: string
 *                 description: The material code
 *               description:
 *                 type: string
 *                 description: Description of the material
 *               supplierA:
 *                 type: string
 *                 description: Supplier A code
 *               Aper:
 *                 type: number
 *                 description: Allocation percentage for supplier A
 *               supplierB:
 *                 type: string
 *                 description: Supplier B code
 *               Bper:
 *                 type: number
 *                 description: Allocation percentage for supplier B
 *               MRP:
 *                 type: number
 *                 description: Material Requirement Planning value
 *               plant:
 *                 type: string
 *                 description: Plant location code
 *     responses:
 *       '201':
 *         description: Material supplier created successfully
 *       '400':
 *         description: Missing required fields
 *       '500':
 *         description: Failed to create material supplier
 */
router.post('/material-supplier', materialSupplierController.create);

/**
 * @swagger
 * /material-supplier:
 *   get:
 *     summary: Get all Material supplier records
 *     tags: [MaterialSupplier]
 *     responses:
 *       '200':
 *         description: A JSON array of all Material supplier records
 *       '500':
 *         description: Failed to fetch Material suppliers
 */
router.get('/material-supplier', materialSupplierController.getAll);

/**
 * @swagger
 * /material-supplier/{id}:
 *   get:
 *     summary: Get a Material supplier record by ID
 *     tags: [MaterialSupplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Material supplier record
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The requested Material supplier record
 *       '404':
 *         description: Material supplier with specified ID not found
 *       '500':
 *         description: Failed to fetch Material supplier
 */
router.get('/material-supplier/:id', materialSupplierController.getById);

/**
 * @swagger
 * /material-supplier/{id}:
 *   put:
 *     summary: Update an existing Material supplier record
 *     tags: [MaterialSupplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Material supplier record
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               material:
 *                 type: string
 *                 description: The material code
 *               description:
 *                 type: string
 *                 description: Description of the material
 *               supplierA:
 *                 type: string
 *                 description: Supplier A code
 *               Aper:
 *                 type: number
 *                 description: Allocation percentage for supplier A
 *               supplierB:
 *                 type: string
 *                 description: Supplier B code
 *               Bper:
 *                 type: number
 *                 description: Allocation percentage for supplier B
 *               MRP:
 *                 type: number
 *                 description: Material Requirement Planning value
 *               plant:
 *                 type: string
 *                 description: Plant location code
 *     responses:
 *       '200':
 *         description: Material supplier updated successfully
 *       '400':
 *         description: Missing required fields
 *       '404':
 *         description: Material supplier with specified ID not found
 *       '500':
 *         description: Failed to update Material supplier
 */
router.put('/material-supplier/:id', materialSupplierController.update);

/**
 * @swagger
 * /material-supplier/{id}:
 *   delete:
 *     summary: Delete a Material supplier record by ID
 *     tags: [MaterialSupplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Material supplier record
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Material supplier deleted successfully
 *       '404':
 *         description: Material supplier with specified ID not found
 *       '500':
 *         description: Failed to delete Material supplier
 */
router.delete('/material-supplier/:id', materialSupplierController.delete);

module.exports = router;