import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getAllCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';




const router = express.Router();


// Routes
//create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);
//update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);
//getAll category
router.get('/getall-category', getAllCategoryController);
//single category
router.get('/single-category/:slug', singleCategoryController)
//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;
