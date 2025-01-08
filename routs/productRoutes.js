import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {getOrdersController,getAllOrdersController,orderStatusController, createProductController,getProductController,  updateProductController,  getSingleProductController, getProductPhotoController, deleteProductController, filterProductController, countProductController,  productListController, searchProductController, similarProductController, categoryWiseProductController, braintreeTokenController,  braintreePaymentController } from '../controllers/productController.js';
import formidable from 'express-formidable';


const router = express.Router();



//Route
router.post('/create-product', requireSignIn, isAdmin, formidable() , createProductController);

//update products
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable() , updateProductController);

//get all products
router.get('/get-product', getProductController);

//single product
router.get('/get-product/:slug', getSingleProductController);

//get photo
router.get('/get-product-photo/:pid', getProductPhotoController);

//delete router
router.delete('/delete-product/:pid', deleteProductController);

//filter Product
router.post('/filter-product', filterProductController);

//count products
router.get('/count-product', countProductController);

//product per page
router.get('/product-list/:page', productListController);

//search product
router.get('/search-product/:keyword', searchProductController);

//similar product
router.get('/similar-product/:pid/:cid', similarProductController);

//category wise product
router.get('/category-wise-product/:slug', categoryWiseProductController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put("/order-status/:orderId", requireSignIn,isAdmin, orderStatusController);


export default router