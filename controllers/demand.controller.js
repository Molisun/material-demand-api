// controllers/demand.controller.js
const { dbGet, dbAll } = require('../db');

/**
 * 根据供应商代码计算其对应物料的需求量
 */
exports.calculateDemand = async (req, res) => {
  const supplierCode = req.params.supplierCode;
  
  try {
    // 首先检查供应商是否存在
    const supplierQuery = `SELECT * FROM supplier WHERE supplierCode = ?`;
    const supplier = await dbGet(supplierQuery, [supplierCode]);
    
    if (!supplier) {
      return res.status(404).json({ 
        error: `Supplier with code ${supplierCode} not found` 
      });
    }
    
    // 查询该供应商关联的所有物料及其分配比例
    // 使用预编译语句防止SQL注入
    const query = `
      SELECT 
        ms.material,
        CASE 
          WHEN ms.supplierA = ? THEN ms.Aper
          WHEN ms.supplierB = ? THEN ms.Bper
          ELSE 0 
        END AS allocationPercentage,
        ms.description,
        mp.currentMonth,
        mp.nextMonth,
        mp.nextNextMonth,
        mp.unit
      FROM materialSupplier ms
      JOIN materialPR mp ON ms.material = mp.material
      WHERE ms.supplierA = ? OR ms.supplierB = ?
    `;
    
    const rows = await dbAll(query, [
      supplierCode, 
      supplierCode, 
      supplierCode, 
      supplierCode
    ]);
    
    // 计算实际需求量
    const result = rows.map(row => ({
      material: row.material,
      description: row.description,
      unit: row.unit,
      currentMonthDemand: parseFloat((row.currentMonth * row.allocationPercentage).toFixed(0)),
      nextMonthDemand: parseFloat((row.nextMonth * row.allocationPercentage).toFixed(0)),
      nextNextMonthDemand: parseFloat((row.nextNextMonth * row.allocationPercentage).toFixed(0)),
      allocationPercentage: row.allocationPercentage
    }));
    
    res.json({
      supplierCode: supplierCode,
      supplierName: supplier.supplierName,
      totalMaterials: result.length,
      demand: result
    });
  } catch (error) {
    console.error('Error calculating demand:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};