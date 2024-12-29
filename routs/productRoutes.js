import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController,getProductController,  updateProductController,  getSingleProductController, getProductPhotoController, deleteProductController } from '../controllers/productController.js';
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



export default router