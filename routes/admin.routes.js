const express = require("express");

const adminController = require("../controllers/admin.controllers");
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get("/products", adminController.getProducts);
// this with handle /admin/products because we define in the routes in the app.js like this --> app.use('/admin',adminRoutes);

router.get("/products/new", adminController.getNewProduct);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

router.get('/products/:id', adminController.getUpdateProduct);

router.post('/products/:id', adminController.updateProduct)

module.exports = router;
