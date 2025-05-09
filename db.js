const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');
const path = require('path');

// 假设您的数据库文件在项目的db目录下
const dbPath = path.resolve(__dirname, 'MaterialPR.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database', err.message);
  } else {
    console.log('Connected to existing SQLite database');
  }
});

/**
 * 自定义封装db.run方法，使其支持Promise并返回lastID和changes
 * @param sql SQL语句
 * @param params 参数数组
 * @returns {Promise<any>}
 */
function dbRun(sql, params) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ lastID: this.lastID, changes: this.changes });
        }
      });
    });
  }

// 使用promisify来处理异步操作
const dbGet = promisify(db.get).bind(db);
const dbAll = promisify(db.all).bind(db);

// 验证数据库连接和表是否存在
async function validateDatabase() {
  try {
    // 检查表是否存在
    const tables = ['materialPR', 'materialSupplier', 'supplier'];
    
    for (const table of tables) {
      const row = await dbGet(
        `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
        [table]
      );
      
      if (!row) {
        throw new Error(`Required table ${table} does not exist in the database`);
      }
    }
    
    console.log('Database validation successful. All required tables exist.');
  } catch (error) {
    console.error('Database validation failed:', error.message);
    process.exit(1); // 终止进程如果验证失败
  }
}

validateDatabase();

module.exports = {
  db,
  dbRun,
  dbGet,
  dbAll
};