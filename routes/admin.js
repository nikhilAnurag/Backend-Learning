
// import the express module for the express module
const express = require('express');

// import the adminController to check and different method and perform functionalities
const adminController = require('../controllers/admin');

// it creates new router object, The express.Router() is when we want to handle different routes.
const router = express.Router();

// // /admin/add-product => GET 
// //to add new product in the product list by the admin and call the getAddProduct function to add the new product
 router.get('/add-product', adminController.getAddProduct);

// // /admin/products => GET
// // routes to return list of all product for the admin
router.get('/products', adminController.getProducts);

// // /admin/add-product => POST
// // handle the add-product , POST call to add the product after the admin has given details for the product
router.post('/add-product', adminController.postAddProduct);

// // /admin/edit-product/:productId
// // dynamic routing to edit the product with the proper productId
 router.get('/edit-product/:productId',adminController.getEditProduct);

// // handle the post request to change the values of the edited product
router.post('/edit-product',adminController.postEditProduct)

// // handle the request to delete-product by the admin
 router.post('/delete-product',adminController.postDeleteProduct);

// export the module to get call in app.js
module.exports = router;
