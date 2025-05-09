// routes/material-pr.routes.js
const express = require('express');
const router = express.Router();
const materialPRController = require('../controllers/material-pr.controller');

/**
 * @swagger
 * tags:
 *   - name: MaterialPR
 *     description: API endpoints for managing material purchase requests (PR)
 */

/**
 * @swagger
 * /material-pr:
 *   post:
 *     summary: Create a new material PR record
 *     tags: [MaterialPR]
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
 *               currentMonth:
 *                 type: number
 *                 description: Demand for the current month
 *               nextMonth:
 *                 type: number
 *                 description: Demand for the next month
 *               nextNextMonth:
 *                 type: number
 *                 description: Demand for the month after next
 *               unit:
 *                 type: string
 *                 description: Unit of measurement
 *     responses:
 *       '201':
 *         description: Material PR created successfully
 *       '400':
 *         description: Missing required fields
 *       '500':
 *         description: Failed to create material PR
 */
router.post('/material-pr', materialPRController.create);

/**
 * @swagger
 * /material-pr:
 *   get:
 *     summary: Get all material PR records
 *     tags: [MaterialPR]
 *     responses:
 *       '200':
 *         description: A JSON array of all material PR records
 *       '500':
 *         description: Failed to fetch material PRs
 */
router.get('/material-pr', materialPRController.getAll);

/**
 * @swagger
 * /material-pr/{id}:
 *   get:
 *     summary: Get a material PR record by ID
 *     tags: [MaterialPR]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the material PR record
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The requested material PR record
 *       '404':
 *         description: Material PR with specified ID not found
 *       '500':
 *         description: Failed to fetch material PR
 */
router.get('/material-pr/:id', materialPRController.getById);

/**
 * @swagger
 * /material-pr/{id}:
 *   put:
 *     summary: Update an existing material PR record
 *     tags: [MaterialPR]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the material PR record
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
 *               currentMonth:
 *                 type: number
 *                 description: Updated demand for the current month
 *               nextMonth:
 *                 type: number
 *                 description: Updated demand for the next month
 *               nextNextMonth:
 *                 type: number
 *                 description: Updated demand for the month after next
 *               unit:
 *                 type: string
 *                 description: Unit of measurement
 *     responses:
 *       '200':
 *         description: Material PR updated successfully
 *       '400':
 *         description: Missing required fields
 *       '404':
 *         description: Material PR with specified ID not found
 *       '500':
 *         description: Failed to update material PR
 */
router.put('/material-pr/:id', materialPRController.update);

/**
 * @swagger
 * /material-pr/{id}:
 *   delete:
 *     summary: Delete a material PR record by ID
 *     tags: [MaterialPR]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the material PR record
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Material PR deleted successfully
 *       '404':
 *         description: Material PR with specified ID not found
 *       '500':
 *         description: Failed to delete material PR
 */
router.delete('/material-pr/:id', materialPRController.delete);

module.exports = router;