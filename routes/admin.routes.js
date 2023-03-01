const express = require("express");

const adminController = require("../controllers/admin.controllers");

const router = express.Router();

router.get("/products", adminController.getProducts);
// this with handle /admin/products because we definet in the routes in the app.js like this --> app.use('/admin',adminRoutes);

router.get("/products/new", adminController.getNewProduct);

module.exports = router;
