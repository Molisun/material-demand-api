const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');
const cors = require('cors');
const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
// const materialPRRoutes = require('./routes/material-pr.routes');
// const materialSupplierRoutes = require('./routes/material-supplier.routes');
// const supplierRoutes = require('./routes/supplier.routes');
const demandRoutes = require('./routes/demand.routes');

// app.use(materialPRRoutes);
// app.use(materialSupplierRoutes);
// app.use(supplierRoutes);
app.use(demandRoutes);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// 设置Swagger UI路由
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/docs`);
});