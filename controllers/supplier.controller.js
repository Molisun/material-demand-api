// controllers/supplier.controller.js
const { dbRun, dbGet, dbAll } = require('../db');

// 创建新的supplier记录
exports.create = async (req, res) => {
  const { supplierCode, supplierName } = req.body;
  
  if (!supplierCode || !supplierName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const checkSql = `SELECT * FROM supplier WHERE supplierCode = ?`;
    const existing = await dbGet(checkSql, [supplierCode]);
    
    if (existing) {
      return res.status(409).json({ 
        error: `Supplier with code ${supplierCode} already exists` 
      });
    }
    
    const insertSql = `
      INSERT INTO supplier (supplierCode, supplierName)
      VALUES (?, ?)
    `;
    
    const result = await dbRun(insertSql, [supplierCode, supplierName]);
    
    res.status(201).json({
      message: "Supplier created successfully",
      data: { id: result.lastID },
      changes: result.changes
    });
  } catch (error) {
    console.error('Error creating supplier:', error.message);
    res.status(500).json({ error: 'Failed to create supplier' });
  }
};

// 获取所有supplier记录
exports.getAll = async (req, res) => {
  try {
    const rows = await dbAll(`SELECT * FROM supplier`, []);
    res.json({ count: rows.length, data: rows });
  } catch (error) {
    console.error('Error fetching suppliers:', error.message);
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
};

// 根据ID获取supplier记录
exports.getById = async (req, res) => {
  const id = req.params.id;
  
  try {
    const row = await dbGet(`SELECT * FROM supplier WHERE id = ?`, [id]);
    
    if (!row) {
      return res.status(404).json({ error: `Supplier with ID ${id} not found` });
    }
    
    res.json(row);
  } catch (error) {
    console.error('Error fetching supplier:', error.message);
    res.status(500).json({ error: 'Failed to fetch supplier' });
  }
};

// 根据supplierCode获取supplier记录
exports.getByCode = async (req, res) => {
  const supplierCode = req.params.supplierCode;
  
  try {
    const row = await dbGet(
      `SELECT * FROM supplier WHERE supplierCode = ?`, 
      [supplierCode]
    );
    
    if (!row) {
      return res.status(404).json({ 
        error: `Supplier with code ${supplierCode} not found` 
      });
    }
    
    res.json(row);
  } catch (error) {
    console.error('Error fetching supplier by code:', error.message);
    res.status(500).json({ error: 'Failed to fetch supplier' });
  }
};

// 更新supplier记录
exports.update = async (req, res) => {
  const id = req.params.id;
  const { supplierCode, supplierName } = req.body;
  
  if (!supplierCode || !supplierName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const checkSql = `SELECT * FROM supplier WHERE id = ?`;
    const existing = await dbGet(checkSql, [id]);
    
    if (!existing) {
      return res.status(404).json({ error: `Supplier with ID ${id} not found` });
    }
    
    // 检查是否尝试使用已存在的供应商代码
    const checkCodeSql = `SELECT * FROM supplier WHERE supplierCode = ? AND id != ?`;
    const existingCode = await dbGet(checkCodeSql, [supplierCode, id]);
    
    if (existingCode) {
      return res.status(409).json({ 
        error: `Supplier code ${supplierCode} is already used by another supplier` 
      });
    }
    
    const updateSql = `
      UPDATE supplier SET
        supplierCode = ?,
        supplierName = ?
      WHERE id = ?
    `;
    
    const result = await dbRun(updateSql, [
      supplierCode, 
      supplierName, 
      id
    ]);
    
    res.json({
      message: "Supplier updated successfully",
      changes: result.changes
    });
  } catch (error) {
    console.error('Error updating supplier:', error.message);
    res.status(500).json({ error: 'Failed to update supplier' });
  }
};

// 删除supplier记录
exports.delete = async (req, res) => {
  const id = req.params.id;
  
  try {
    const checkSql = `SELECT * FROM supplier WHERE id = ?`;
    const existing = await dbGet(checkSql, [id]);
    
    if (!existing) {
      return res.status(404).json({ error: `Supplier with ID ${id} not found` });
    }
    
    // 检查是否有其他表引用这个供应商
    const checkReferences = `
      SELECT COUNT(*) as count 
      FROM materialSupplier 
      WHERE supplierA = ? OR supplierB = ?
    `;
    const referenceCount = await dbGet(checkReferences, [
      existing.supplierCode, 
      existing.supplierCode
    ]);
    
    if (referenceCount.count > 0) {
      return res.status(409).json({ 
        error: `Cannot delete supplier because it is referenced in materialSupplier table` 
      });
    }
    
    const deleteSql = `DELETE FROM supplier WHERE id = ?`;
    const result = await dbRun(deleteSql, [id]);
    
    res.json({
      message: "Supplier deleted successfully",
      changes: result.changes
    });
  } catch (error) {
    console.error('Error deleting supplier:', error.message);
    res.status(500).json({ error: 'Failed to delete supplier' });
  }
};