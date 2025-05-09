// controllers/material-supplier.controller.js
const { dbRun, dbGet, dbAll } = require('../db');

// 创建新的materialSupplier记录
exports.create = async (req, res) => {
  const { 
    material, description, supplierA, Aper, supplierB, Bper, MRP, plant 
  } = req.body;
  
  if (!material || !description || !supplierA || Aper === undefined || 
      !supplierB || Bper === undefined || !MRP || !plant) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const sql = `
      INSERT INTO materialSupplier (
        material, description, supplierA, Aper, supplierB, Bper, MRP, plant
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const result = await dbRun(sql, [
      material, 
      description, 
      supplierA, 
      Aper, 
      supplierB, 
      Bper, 
      MRP, 
      plant
    ]);
    
    res.status(201).json({
      message: "Material Supplier created successfully",
      data: { id: result.lastID },
      changes: result.changes
    });
  } catch (error) {
    console.error('Error creating material supplier:', error.message);
    res.status(500).json({ error: 'Failed to create material supplier' });
  }
};

// 获取所有materialSupplier记录
exports.getAll = async (req, res) => {
  try {
    const rows = await dbAll(`SELECT * FROM materialSupplier`, []);
    res.json({ count: rows.length, data: rows });
  } catch (error) {
    console.error('Error fetching material suppliers:', error.message);
    res.status(500).json({ error: 'Failed to fetch material suppliers' });
  }
};

// 根据ID获取materialSupplier记录
exports.getById = async (req, res) => {
  const id = req.params.id;
  
  try {
    const row = await dbGet(`SELECT * FROM materialSupplier WHERE id = ?`, [id]);
    
    if (!row) {
      return res.status(404).json({ 
        error: `Material Supplier with ID ${id} not found` 
      });
    }
    
    res.json(row);
  } catch (error) {
    console.error('Error fetching material supplier:', error.message);
    res.status(500).json({ error: 'Failed to fetch material supplier' });
  }
};

// 更新materialSupplier记录
exports.update = async (req, res) => {
  const id = req.params.id;
  const { 
    material, description, supplierA, Aper, supplierB, Bper, MRP, plant 
  } = req.body;
  
  if (!material || !description || !supplierA || Aper === undefined || 
      !supplierB || Bper === undefined || !MRP || !plant) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const checkSql = `SELECT * FROM materialSupplier WHERE id = ?`;
    const existing = await dbGet(checkSql, [id]);
    
    if (!existing) {
      return res.status(404).json({ 
        error: `Material Supplier with ID ${id} not found` 
      });
    }
    
    const updateSql = `
      UPDATE materialSupplier SET
        material = ?,
        description = ?,
        supplierA = ?,
        Aper = ?,
        supplierB = ?,
        Bper = ?,
        MRP = ?,
        plant = ?
      WHERE id = ?
    `;
    
    const result = await dbRun(updateSql, [
      material, 
      description, 
      supplierA, 
      Aper, 
      supplierB, 
      Bper, 
      MRP, 
      plant,
      id
    ]);
    
    res.json({
      message: "Material Supplier updated successfully",
      changes: result.changes
    });
  } catch (error) {
    console.error('Error updating material supplier:', error.message);
    res.status(500).json({ error: 'Failed to update material supplier' });
  }
};

// 删除materialSupplier记录
exports.delete = async (req, res) => {
  const id = req.params.id;
  
  try {
    const checkSql = `SELECT * FROM materialSupplier WHERE id = ?`;
    const existing = await dbGet(checkSql, [id]);
    
    if (!existing) {
      return res.status(404).json({ 
        error: `Material Supplier with ID ${id} not found` 
      });
    }
    
    const deleteSql = `DELETE FROM materialSupplier WHERE id = ?`;
    const result = await dbRun(deleteSql, [id]);
    
    res.json({
      message: "Material Supplier deleted successfully",
      changes: result.changes
    });
  } catch (error) {
    console.error('Error deleting material supplier:', error.message);
    res.status(500).json({ error: 'Failed to delete material supplier' });
  }
};