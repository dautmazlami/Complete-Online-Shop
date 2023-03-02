const express = require("express");

const adminController = require("../controllers/admin.controllers");
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get("/products", adminController.getProducts);
// this with handle /admin/products because we definet in the routes in the app.js like this --> app.use('/admin',adminRoutes);

router.get("/products/new", adminController.getNewProduct);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

module.exports = router;
