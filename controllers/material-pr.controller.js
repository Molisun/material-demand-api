// controllers/material-pr.controller.js
const { dbRun, dbGet, dbAll } = require('../db');

// 创建新的materialPR记录
exports.create = async (req, res) => {
  const { material, currentMonth, nextMonth, nextNextMonth, unit } = req.body;
  
  if (!material || currentMonth === undefined || nextMonth === undefined || 
      nextNextMonth === undefined || !unit) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const sql = `
      INSERT INTO materialPR (material, currentMonth, nextMonth, nextNextMonth, unit)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const result = await dbRun(sql, [
      material, 
      currentMonth, 
      nextMonth, 
      nextNextMonth, 
      unit
    ]);
    
    console.log('Material PR created:', result);
    
    res.status(201).json({
      message: "Material PR created successfully",
      data: { id: result.lastID },
      changes: result.changes
    });
  } catch (error) {
    console.error('Error creating material PR:', error.message);
    res.status(500).json({ error: 'Failed to create material PR' });
  }
};

// 获取所有materialPR记录
exports.getAll = async (req, res) => {
  try {
    const rows = await dbAll(`SELECT * FROM materialPR`, []);
    res.json({ count: rows.length, data: rows });
  } catch (error) {
    console.error('Error fetching material PRs:', error.message);
    res.status(500).json({ error: 'Failed to fetch material PRs' });
  }
};

// 根据ID获取materialPR记录
exports.getById = async (req, res) => {
  const id = req.params.id;
  
  try {
    const row = await dbGet(`SELECT * FROM materialPR WHERE id = ?`, [id]);
    
    if (!row) {
      return res.status(404).json({ error: `Material PR with ID ${id} not found` });
    }
    
    res.json(row);
  } catch (error) {
    console.error('Error fetching material PR:', error.message);
    res.status(500).json({ error: 'Failed to fetch material PR' });
  }
};

// 更新materialPR记录
exports.update = async (req, res) => {
  const id = req.params.id;
  const { material, currentMonth, nextMonth, nextNextMonth, unit } = req.body;
  
  if (!material || currentMonth === undefined || nextMonth === undefined || 
      nextNextMonth === undefined || !unit) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const checkSql = `SELECT * FROM materialPR WHERE id = ?`;
    const existing = await dbGet(checkSql, [id]);
    
    if (!existing) {
      return res.status(404).json({ error: `Material PR with ID ${id} not found` });
    }
    
    const updateSql = `
      UPDATE materialPR SET
        material = ?,
        currentMonth = ?,
        nextMonth = ?,
        nextNextMonth = ?,
        unit = ?
      WHERE id = ?
    `;
    
    const result = await dbRun(updateSql, [
      material, 
      currentMonth, 
      nextMonth, 
      nextNextMonth, 
      unit,
      id
    ]);
    
    res.json({
      message: "Material PR updated successfully",
      changes: result.changes
    });
  } catch (error) {
    console.error('Error updating material PR:', error.message);
    res.status(500).json({ error: 'Failed to update material PR' });
  }
};

// 删除materialPR记录
exports.delete = async (req, res) => {
  const id = req.params.id;
  
  try {
    const checkSql = `SELECT * FROM materialPR WHERE id = ?`;
    const existing = await dbGet(checkSql, [id]);
    
    if (!existing) {
      return res.status(404).json({ error: `Material PR with ID ${id} not found` });
    }
    
    const deleteSql = `DELETE FROM materialPR WHERE id = ?`;
    const result = await dbRun(deleteSql, [id]);
    
    res.json({
      message: "Material PR deleted successfully",
      changes: result.changes
    });
  } catch (error) {
    console.error('Error deleting material PR:', error.message);
    res.status(500).json({ error: 'Failed to delete material PR' });
  }
};