// routes/demand.routes.js
const express = require('express');
const router = express.Router();
const demandController = require('../controllers/demand.controller');

/**
 * @swagger
 * tags:
 *   - name: Demand
 *     description: API endpoints for calculating material demand based on supplier code
 */

/**
 * @swagger
 * /supplier-demand/{supplierCode}:
 *   get:
 *     summary: Calculate and retrieve material demand for a specific supplier
 *     tags: [Demand]
 *     parameters:
 *       - in: path
 *         name: supplierCode
 *         required: true
 *         description: Unique code identifying the supplier
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully calculated and returned material demand for the supplier
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalDemand:
 *                   type: number
 *                   description: Total material demand across all months
 *                 monthlyDemand:
 *                   type: object
 *                   description: Detailed demand per month
 *                   properties:
 *                     currentMonth:
 *                       type: number
 *                     nextMonth:
 *                       type: number
 *                     nextNextMonth:
 *                       type: number
 *                 unit:
 *                   type: string
 *                   description: Unit of measurement for the material
 *       '404':
 *         description: Supplier not found or no associated materials found
 *       '500':
 *         description: Internal server error
 */
router.get('/supplier-demand/:supplierCode', demandController.calculateDemand);

module.exports = router;