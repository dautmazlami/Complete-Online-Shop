const express = require("express");

const adminController = require("../controllers/admin.controllers");
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get("/products", adminController.getProducts);
// this with handle /admin/products because we define in the routes in the app.js like this --> app.use('/admin',adminRoutes);

router.get("/products/new", adminController.getNewProduct);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

router.get('/products/:id', adminController.getUpdateProduct);

router.post('/products/:id',imageUploadMiddleware, adminController.updateProduct);

// in this post router we are using a http method .delete we can achive this
// simply so that we can also practise this and of course to avoid reloading the page if we just delete one of the product there 
router.delete('/products/:id', adminController.deleteProduct);

module.exports = router;
